import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Header,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";

const ViewCourses = () => {
  const [studentID, setStudentID] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStudentPortal = () => {
    navigate("/Student/StudentPortal");
  };

  const fetchStudentCourses = async () => {
    if (!studentID) {
      setMessage("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setStudentData(null);

    try {
      const response = await axios.get("http://localhost:5500/api/Student/viewCourses", {
        params: { StudentID: studentID },
      });
      setStudentData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("No courses found for the specified Student ID.");
      } else {
        setMessage("An error occurred while fetching the data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header style={{
        backgroundColor: '#001F3F',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px'
      }} as="h1" textAlign="center">
        View Student Courses
      </Header>

      <Segment>
        <Form>
          <Form.Field>
            <label>Student ID</label>
            <input
              type="number"
              placeholder="Enter Student ID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </Form.Field>
          <Button
            color="teal"
            onClick={fetchStudentCourses}
            style={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </Form>
      </Segment>

      {loading && <Message info>Loading...</Message>}

      {message && (
        <Message negative style={{ marginTop: "20px" }}>
          {message}
        </Message>
      )}

      {studentData && (
        <Segment style={{ marginTop: "20px" }}>
          <Header as="h3">Student Information</Header>
          <p>
            <strong>Student ID:</strong> {studentData.StudentID}
          </p>
          <p>
            <strong>Student Name:</strong> {studentData.StudentName}
          </p>
          <p>
            <strong>Program:</strong> {studentData.Program}
          </p>
          <p>
            <strong>Semester:</strong> {studentData.Semester}
          </p>

          <Header as="h4">Registered Courses</Header>
          <Table celled  striped responsive>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Course ID</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Theory Credit Hours</Table.HeaderCell>
                <Table.HeaderCell>Lab Credit Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {studentData.Courses.map((course) => (
                <Table.Row key={course.CourseID}>
                  <Table.Cell>{course.CourseID}</Table.Cell>
                  <Table.Cell>{course.CourseName}</Table.Cell>
                  <Table.Cell>{course.CreditHrTh}</Table.Cell>
                  <Table.Cell>{course.CreditHrLab}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}

      <Segment textAlign="center">
        <Button color="teal" onClick={handleStudentPortal}>
          Registered Courses
        </Button>
      </Segment>
    </Container>
  );
};

export default ViewCourses;
