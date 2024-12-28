import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Message,
  Segment,
  Table,
  Menu
} from "semantic-ui-react";

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [StudentID, setStudentID] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleViewCourses = () => {
    navigate("/Student/viewCourses");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Student/RegisterCourses", {
        params: { StudentID: StudentID },
      });
      setCourses(response.data);
      setMessage("");
      setError(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("Error fetching courses. Please try again later.");
      setError(true);
    }
  };

  useEffect(() => {
    if (StudentID) fetchAvailableCourses();
  }, []);

  const handleCourseSelection = (courseID) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseID)
        ? prevSelected.filter((id) => id !== courseID)
        : [...prevSelected, courseID]
    );
  };

  const handleRegistration = async () => {
    if (!StudentID) {
      setMessage("Please provide a valid Student ID.");
      setError(true);
      return;
    }

    if (selectedCourses.length === 0) {
      setMessage("Please select at least one course.");
      setError(true);
      return;
    }

    const payload = {
      StudentID: StudentID,
      CourseID: selectedCourses,
    };

    try {
      const response = await axios.post(
        "http://localhost:5500/api/Student/RegisterCourses",
        payload
      );
      setMessage(response.data.message || "Registered successfully!");
      setError(false);
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error registering courses:", error);
      setMessage(`Error: ${error.response?.data?.message || "An error occurred."}`);
      setError(true);
    }
  };

  return (
    <div>
          <Menu inverted>
        <Menu.Item header>Course Management System</Menu.Item>
        <Menu.Item name="View Registered Courses" onClick={() => handleViewCourses()} />

        <Menu.Item name="Logout" position="right" onClick={() => handleBackHome()} />
      </Menu>

    <Container style={{ marginTop: "2rem" }}>
      <Header style={{
        backgroundColor: '#001F3F',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}  as="h1" textAlign="center">
        Course Registration
      </Header>

      <Segment>
        <Form>
          <Form.Field>
            <label>Student ID</label>
            <input
              type="number"
              placeholder="Enter Student ID"
              value={StudentID}
              onChange={(e) => setStudentID(e.target.value)}
            
            />
          </Form.Field>
          <Button
            color="teal"
            
            onClick={fetchAvailableCourses}
            style={{ marginTop: "10px" }}
          >
            Search Available Courses
          </Button>
        </Form>
      </Segment>

      {message && (
        <Message
          positive={!error}
          negative={error}
          style={{ marginTop: "20px" }}
        >
          {message}
        </Message>
      )}

      <Segment>
        <Header as="h3">Available Courses</Header>
        {courses.length > 0 ? (
          <Table celled  striped responsive>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Course ID</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Select</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {courses.map((course) => (
                <Table.Row key={course.CourseID}>
                  <Table.Cell>{course.CourseID}</Table.Cell>
                  <Table.Cell>{course.CourseName}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      checked={selectedCourses.includes(course.CourseID)}
                      onChange={() => handleCourseSelection(course.CourseID)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>No courses available or loading...</p>
        )}

        <Button
          positive
          onClick={handleRegistration}
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </Segment>

  
    </Container>
          </div>
  );
};

export default RegisterCourse;
