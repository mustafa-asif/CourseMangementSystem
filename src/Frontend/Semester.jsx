import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, Header, Container, Segment, Message } from 'semantic-ui-react';

const Semester = () => {
  const [Semester, setSemester] = useState([]);
  const [SemesterID, setID] = useState("");
  const [SemesterName, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate('/Admin/Courses');
  };

  // Fetch semesters from backend
  const fetchSemester = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Admin/Semesters");
      setSemester(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Semester:", error);
      setError("Error fetching Semester");
      setLoading(false);
    }
  };

  // Add a semester
  const addSemester = async () => {
    try {
      await axios.post(
        "http://localhost:5500/api/Admin/Semesters",
        { SemesterID, SemesterName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      fetchSemester();
      setID("");
      setName("");
    } catch (error) {
      console.error("Error adding Semester:", error);
    }
  };

  // Delete a semester
  const deleteSemester = async (SemesterID) => {
    try {
      await axios.delete(`http://localhost:5500/api/Admin/Semesters/${SemesterID}`);
      fetchSemester();
    } catch (error) {
      console.error("Error deleting Semester:", error);
    }
  };

  useEffect(() => {
    fetchSemester();
  }, []);

  return (
      <Container style={{ marginTop: '3rem', backgroundColor: '#f7f8fa', padding: '2rem', borderRadius: '8px' }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
        Semester Management
      </Header>

      {loading && <Message info>Loading semesters...</Message>}
      {error && <Message error>{error}</Message>}

      <Segment>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addSemester();
          }}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <label>Semester ID</label>
              <Input
                type="number"
                placeholder="Semester ID"
                value={SemesterID}
                onChange={(e) => setID(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Semester Name</label>
              <Input
                type="text"
                placeholder="Semester Name"
                value={SemesterName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Field>
          </Form.Group>
          <Button type="submit" primary>Add Semester</Button>
        </Form>
      </Segment>

      {!loading && !error && (
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Semester ID</Table.HeaderCell>
                <Table.HeaderCell>Semester Name</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Semester.map((sem) => (
                <Table.Row key={sem.SemesterID}>
                  <Table.Cell>{sem.SemesterID}</Table.Cell>
                  <Table.Cell>{sem.SemesterName}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      
                      onClick={() => deleteSemester(sem.SemesterID)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}

      <Segment textAlign="center">
        <Button color="teal" onClick={handleAddCourse}>
          Add Courses
        </Button>
      </Segment>
    </Container>
  );
};

export default Semester;
