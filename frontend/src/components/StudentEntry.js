import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { attendanceUpdate } from "../actions/attendanceActions";

const StudentEntry = ({ student }) => {
  const [status, setStatus] = useState("");
  const [record, setRecord] = useState({})
  const d = new Date();
  const n = d.toLocaleDateString();
  const dispatch = useDispatch();

  const updateHandler = (e, record) => {
    dispatch(attendanceUpdate(e.target.value, record));
    setStatus(e.target.value);
  };

  useEffect(() => {
    student.attendance.forEach((record) => {
      if (record.date === n) {
        setRecord(record)
        setStatus(record.status)
      }
    });
  }, [student, n]);
  return (
    <>
      <tr key={student._id}>
        <LinkContainer to={`/student-details/${student._id}`}>
          <td>{student.name}</td>
        </LinkContainer>
        <td>{student.grade}</td>
        <td key={record._id}>
          <Form.Group controlId="status">
            <Form.Control
              required
              as="select"
              value={status}
              onChange={(e) => updateHandler(e, record)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Tardy">Tardy</option>
            </Form.Control>
          </Form.Group>
        </td>
      </tr>
    </>
  );
};

export default StudentEntry;
