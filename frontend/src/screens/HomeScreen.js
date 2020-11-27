import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listHours } from "../actions/hourActions";
import { Row, Col, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hourList = useSelector((state) => state.hourList);
  const { hours, loading, error } = hourList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listHours());
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Welcome, {userInfo && userInfo.name}!</h3>
          <Row>
            <Col md={2}>
              <Container>
                {hours.length === 0 ? <h5 className="my-4">No classes created...</h5> : hours.map((hour) => (
                  <Row className="my-4" key={hour._id}>
                    <LinkContainer to={`/hour-details/${hour._id}`}>
                      <Button>
                        {hour.hour}: {hour.subject}
                      </Button>
                    </LinkContainer>
                  </Row>
                ))}
              </Container>
            </Col>
            <Col md={12}></Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
