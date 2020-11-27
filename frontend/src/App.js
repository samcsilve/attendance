import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from "react-bootstrap";

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HourDetails from './screens/HourDetails';
import NewStudent from './screens/NewStudent';
import NewHour from './screens/NewHour';
import StudentDetails from './screens/StudentDetails';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/hour-details/:id" component={HourDetails} />
          <Route path="/new-student" component={NewStudent} />
          <Route path="/create-class" component={NewHour} />
          <Route path="/student-details/:id" component={StudentDetails} />
        </Container>
      </main>
    </Router>
  );
}
export default App
