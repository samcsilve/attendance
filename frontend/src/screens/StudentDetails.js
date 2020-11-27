import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentDetails } from "../actions/studentActions";
import { Container, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const StudentDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const studentDetails = useSelector((state) => state.studentDetails);
  const { student, loading, error } = studentDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getStudentDetails(match.params.id));
    }
  }, [dispatch, userInfo, match, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>{student && student.name}</h3>
          <h3>{student.grade}</h3>
          <Container className="my-4">
            <Table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {student &&
                  student.attendance.map((record) => {
                    return (
                      record.status !== "Present" && (
                        <tr key={record._id}>
                          <td>{record.date}</td>
                          <td>{record.status}</td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
};

export default StudentDetails;
