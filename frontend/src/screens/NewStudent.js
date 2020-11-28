import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createStudent } from "../actions/studentActions";
import { listHours } from "../actions/hourActions";

const NewStudent = ({ history }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [hourInfo, setHourInfo] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hourList = useSelector((state) => state.hourList);
  const { hours } = hourList;

  const studentCreate = useSelector((state) => state.studentCreate);
  const { error: errorCreate, success } = studentCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listHours());
      if(success) {
        history.push('/')
      }
    }
  }, [dispatch, history, errorCreate, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createStudent(name, grade, hourInfo));
  };
  return (
    <FormContainer>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <h1>New Student</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="grade">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="hour">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            value={hourInfo}
            onChange={(e) => setHourInfo(e.target.value)}
          >
            {hours &&
              hours.map((hour) => (
                <option value={hour._id} key={hour._id}>
                  {hour.hour}: {hour.subject}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Student
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewStudent;
