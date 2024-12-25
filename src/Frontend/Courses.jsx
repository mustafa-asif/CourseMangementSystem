
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";
import {
  Button,
  Form,
  Table,
  Input,
  Menu,
  Container,
  Header,
  Divider,
  Segment,
} from "semantic-ui-react";

const Courses = () => {
  const [Course, setCourse] = useState([]);
  const [CourseID, setID] = useState("");
  const [CourseName, setName] = useState("");
  const [CreditHrTh, setCreHrTh] = useState("");
  const [CreditHrLab, setCreHrLab] = useState("");
  const [ProgID, setProgID] = useState("");
  const [SemID, setSemID] = useState("");
  const [TeacherID, setTeacherID] = useState("");
  const [showCourses, setShowCourses] = useState(false);

  const navigate = useNavigate();

  // Fetch Courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Admin/Course");
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching Courses:", error);
    }
  };

  // Add a course
  const addCourse = async () => {
    try {
      await axios.post(
        "http://localhost:5500/api/Admin/Course",
        { CourseID, CourseName, CreditHrTh, CreditHrLab, ProgID, SemID, TeacherID },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchCourses();
      setID("");
      setName("");
      setCreHrTh("");
      setCreHrLab("");
      setProgID("");
      setSemID("");
      setTeacherID("");
    } catch (error) {
      console.error("Error adding Course:", error);
    }
  };

  // Delete a Course
  const deleteCourse = async (CourseID) => {
    try {
      await axios.delete(`http://localhost:5500/api/Admin/Course/${CourseID}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting Course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Course Management System</Menu.Item>
        <Menu.Item name="Add Program" onClick={() => navigate("/Admin/Program")} />
        <Menu.Item name="Add Semester" onClick={() => navigate("/Admin/Semester")} />
        <Menu.Item name="Add Student" onClick={() => navigate("/Admin/Student")} />
        <Menu.Item name="Add Teacher" onClick={() => navigate("/Admin/Teacher")} />
        <Menu.Item name="Logout" position="right" onClick={() => navigate("/")} />
      </Menu>

      <Container>
        <Header as="h1" textAlign="center" style={{ marginTop: "1rem" }}>
          Course Management
        </Header>
        <Divider />

        <Segment>
          <Header as="h3">Add a New Course</Header>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse();
            }}
          >
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Course ID"
                placeholder="Course ID"
                value={CourseID}
                onChange={(e) => setID(e.target.value)}
                required
              />
              <Form.Field
                control={Input}
                label="Course Name"
                placeholder="Course Name"
                value={CourseName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Credit Hours (Theory)"
                placeholder="Credit Hours Theory"
                value={CreditHrTh}
                onChange={(e) => setCreHrTh(e.target.value)}
                required
              />
              <Form.Field
                control={Input}
                label="Credit Hours (Lab)"
                placeholder="Credit Hours Lab"
                value={CreditHrLab}
                onChange={(e) => setCreHrLab(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Program ID"
                placeholder="Program ID"
                value={ProgID}
                onChange={(e) => setProgID(e.target.value)}
                required
              />
              <Form.Field
                control={Input}
                label="Semester ID"
                placeholder="Semester ID"
                value={SemID}
                onChange={(e) => setSemID(e.target.value)}
                required
              />
              <Form.Field
                control={Input}
                label="Teacher ID"
                placeholder="Teacher ID"
                value={TeacherID}
                onChange={(e) => setTeacherID(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" primary>Add Course</Button>
          </Form>
        </Segment>

        <Segment>
          <Header as="h3">Course List</Header>
          <Table celled striped responsive>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Course ID</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Credit Hours (Theory)</Table.HeaderCell>
                <Table.HeaderCell>Credit Hours (Lab)</Table.HeaderCell>
                <Table.HeaderCell>Program ID</Table.HeaderCell>
                <Table.HeaderCell>Semester ID</Table.HeaderCell>
                <Table.HeaderCell>Teacher ID</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Course.map((course) => (
                <Table.Row key={course.CourseID}>
                  <Table.Cell>{course.CourseID}</Table.Cell>
                  <Table.Cell>{course.CourseName}</Table.Cell>
                  <Table.Cell>{course.CreditHrTh}</Table.Cell>
                  <Table.Cell>{course.CreditHrLab}</Table.Cell>
                  <Table.Cell>{course.ProgID}</Table.Cell>
                  <Table.Cell>{course.SemID}</Table.Cell>
                  <Table.Cell>{course.TeacherID}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      size="small"
                      onClick={() => deleteCourse(course.CourseID)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>

        <Button
          toggle
          active={showCourses}
          onClick={() => setShowCourses(!showCourses)}
        >
          {showCourses ? "Hide Common Courses" : "Show Common Courses"}
        </Button>
        {showCourses && <SemesterCourses />}
      </Container>
    </div>
  );
};

export default Courses;

