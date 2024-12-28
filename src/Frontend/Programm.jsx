
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button,Menu, Divider,Form, Input, Table, Header, Container, Segment, Message } from 'semantic-ui-react';

const Programm = () => {
  const [Program, setProgram] = useState([]);
  const [ProgID, setProgID] = useState("");
  const [ProgName, setProgName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Route to add courses
  const handleAddCourse = () => {
    navigate('/Admin/Courses');
  };

  // Fetch programs from backend
  const fetchProgramm = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Admin/Program");
      setProgram(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching programm:", error);
      setError("Error fetching Programm");
      setLoading(false);
    }
  };

  // Add program
  const addProgram = async () => {
    try {
      await axios.post(
        "http://localhost:5500/api/Admin/Program",
        { ProgID, ProgName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      fetchProgramm();
      setProgID("");
      setProgName("");
    } catch (error) {
      console.error("Error adding programm:", error);
    }
  };

  // Delete program
  const deleteProgramm = async (ProgID) => {
    try {
      await axios.delete(`http://localhost:5500/api/Admin/Program/${ProgID}`);
      fetchProgramm();
    } catch (error) {
      console.error("Error deleting programm:", error);
    }
  };

  useEffect(() => {
    fetchProgramm();
  }, []);

  return (
    <div>
       <Menu inverted  >
        <Menu.Item header>Course Management System</Menu.Item>

        <Menu.Item name="Courses" position="right" onClick={() => handleAddCourse()} />
      </Menu>
      <Divider />

      <Container style={{ marginTop: '3rem', backgroundColor: '#f7f8fa', padding: '2rem', borderRadius: '8px' }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem'}}>
        Program Management
      </Header>

      {loading && <Message info>Loading programs...</Message>}
      {error && <Message error>{error}</Message>}

      <Segment>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addProgram();
          }}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <label>Program ID</label>
              <Input
                type="number"
                placeholder="Program ID"
                value={ProgID}
                onChange={(e) => setProgID(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Program Name</label>
              <Input
                type="text"
                placeholder="Program Name"
                value={ProgName}
                onChange={(e) => setProgName(e.target.value)}
                required
              />
            </Form.Field>
          </Form.Group>
          <Button type="submit" color='teal'>Add Program</Button>
        </Form>
      </Segment>

      {!loading && !error && (
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Program ID</Table.HeaderCell>
                <Table.HeaderCell>Program Name</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Program.map((prog) => (
                <Table.Row key={prog.ProgID}>
                  <Table.Cell>{prog.ProgID}</Table.Cell>
                  <Table.Cell>{prog.ProgName}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() => deleteProgramm(prog.ProgID)}
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
              </div>
  );
};

export default Programm;

