import React, { useState } from "react";
import axios from "axios";
import "./teacherView.css";

import { useNavigate } from "react-router-dom";
import { Button, Container,Header,Form ,Segment, Message, Table} from "semantic-ui-react";

const TeacherView = () => {
  const [teacherID, setTeacherID] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //route to login page
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
    };

  // Fetch data for the teacher
  const fetchCourses = async () => {
    if (!teacherID) {
      setMessage("Please provide a valid Teacher ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setCourseData([]);

    try {
      const response = await axios.get("http://localhost:5500/api/Teacher/RegisterCourses", {
        params: { teacher_id: teacherID },
      });

      if (response.data.length === 0) {
        setMessage("No data found for the specified Teacher ID.");
      } else {
        setCourseData(response.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred while fetching the data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >

    <Container style={{ marginTop: "2rem" }}>
      <Header style={{
        backgroundColor: '#001F3F',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px'
      }} as='h1' textAlign="center"  >Teacher - View Registered Courses</Header>

      {/* Teacher ID Input */}
      <Segment>
        <Form>
          <Form.Field>
            <label>Teacher ID:</label>
           <input
          type="Number"
          value={teacherID}
          onChange={(e) => setTeacherID(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
          </Form.Field>
        
       
        <Button
          color="teal"
          onClick={fetchCourses}
          style={{ marginTop: "10px" }}
          >
          Search
         </Button>
        </Form>
      </Segment>

      {/* Loading State */}
      {loading && <Message info>Loading...</Message>}

      {/* Message */}
      {message && (<Message negative style={{ marginTop:'20px' }}>{message}</Message>)}

      {/* Course Data */}
      {courseData.length > 0 && (
        <Segment style={{ marginTop: "20px" }}>
          <Header as="h3">Registered Courses and Students</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Student ID</Table.HeaderCell>
                <Table.HeaderCell>Student Name</Table.HeaderCell>
                <Table.HeaderCell>Course ID</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Semester</Table.HeaderCell>
                <Table.HeaderCell>Program</Table.HeaderCell>
                <Table.HeaderCell>TeacherName</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {courseData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.StudentID}</Table.Cell>
                  <Table.Cell>{item.StudentName}</Table.Cell>
                  <Table.Cell>{item.CourseID}</Table.Cell>
                  <Table.Cell>{item.CourseName}</Table.Cell>
                  <Table.Cell>{item.SemesterName}</Table.Cell>
                  <Table.Cell>{item.ProgramName}</Table.Cell>
                  <Table.Cell>{item.TeacherName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}

      <Segment textAlign="center" >
        <Button color="teal" onClick={handleLogin}>Back to login</Button>
      </Segment>
    </Container>
          </div>
  );
};

export default TeacherView;
