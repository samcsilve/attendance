import React, { useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getHourDetails, deleteHour } from "../actions/hourActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import StudentEntry from "../components/StudentEntry";

const HourDetails = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hourDetails = useSelector((state) => state.hourDetails);
  const { hour, loading, error } = hourDetails;

  const deleteHourFromPage = () => {
    dispatch(deleteHour(match.params.id, history));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getHourDetails(match.params.id));
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
          <Container>
            <Row>
              <h3>{hour && hour.subject}</h3>
              <div className="ml-auto">
                <LinkContainer to="/new-student" className="mx-1">
                  <Button className="btn btn-success btn-sm">
                    <i className="fas fa-plus"></i>
                  </Button>
                </LinkContainer>
                <Button
                  onClick={deleteHourFromPage}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </Row>
          </Container>
          <Container className="my-4">
            <Table>
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>GRADE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {hour &&
                  hour.students.map((student) => (
                    <StudentEntry key={student._id} student={student} />
                  ))}
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
};

export default HourDetails;
