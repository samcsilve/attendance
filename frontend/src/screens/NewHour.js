import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createHour } from "../actions/hourActions";

const NewHour = ({ history }) => {
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hourCreate = useSelector((state) => state.hourCreate);
  const { error, success } = hourCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      history.push("/");
    }
  }, [dispatch, history, error, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createHour(hour, subject));
  };
  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      <h1>New Class</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="hour">
          <Form.Label>Hour</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Class
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewHour;
