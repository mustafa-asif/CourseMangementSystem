import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, Header, Container, Segment, Message } from 'semantic-ui-react';

const SemesterCourses = () => {
  const [commonCourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCommonCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Admin/CommonCourses");
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommonCourses();
  }, []);

  return (
    <Container style={{ marginTop: '3rem' }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
        Common Semester Courses
      </Header>

      {loading && <Message info>Loading courses...</Message>}
      {error && <Message error>{error}</Message>}

      {!loading && !error && (
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Course ID</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Teacher Name</Table.HeaderCell>
                <Table.HeaderCell>Teacher Profession</Table.HeaderCell>
                <Table.HeaderCell>Semester Name</Table.HeaderCell>
                <Table.HeaderCell>Program Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {commonCourses.map((course) => (
                <Table.Row key={course.CourseID}>
                  <Table.Cell>{course.CourseID}</Table.Cell>
                  <Table.Cell>{course.CourseName}</Table.Cell>
                  <Table.Cell>{course.TeacherName}</Table.Cell>
                  <Table.Cell>{course.Job}</Table.Cell>
                  <Table.Cell>{course.SemesterName}</Table.Cell>
                  <Table.Cell>{course.ProgName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}
    </Container>
  );
};

export default SemesterCourses;
