import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, Header, Container, Segment, Message } from 'semantic-ui-react';

const Students = () => {
    const [Student, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState();
    const [StudentName, setStudentName] = useState("");
    const [DOB, setDOB] = useState();
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [ProgID, setProgID] = useState("");
    const [SemID, setSemID] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [showCourses, setShowCourses] = useState(false);
    const navigate = useNavigate();

    const addCourseHandler = () => {
        navigate("/Admin/Courses");
    };

    const handleShowCommonCourses = () => {
        setShowCourses(!showCourses);
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Student");
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching Student:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { StudentID, StudentName, DOB, Address, Phone, ProgID, SemID };

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5500/api/Admin/Student/${editID}`, payload, {
                    headers: { "Content-Type": "application/json" },
                });
                setIsEditing(false);
                setEditID(null);
            } else {
                await axios.post("http://localhost:5500/api/Admin/Student", payload, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            fetchStudents();
            resetForm();
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    const deleteStudent = async (StudentID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/Student/${StudentID}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting Student:", error);
        }
    };

    const editStudent = (student) => {
        setIsEditing(true);
        setEditID(student.StudentID);
        setStudentID(student.StudentID);
        setStudentName(student.StudentName);
        setDOB(student.DOB);
        setAddress(student.Address);
        setPhone(student.Phone);
        setProgID(student.ProgID);
        setSemID(student.SemID);
    };

    const resetForm = () => {
        setStudentID("");
        setStudentName("");
        setDOB("");
        setAddress("");
        setPhone("");
        setProgID("");
        setSemID("");
        setIsEditing(false);
        setEditID(null);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Container style={{ marginTop: '3rem', backgroundColor: '#f7f8fa', padding: '2rem', borderRadius: '8px' }}>
            <Header as="h1" textAlign="center">Student Management</Header>

            <Segment>
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            type="number"
                            label="Student ID"
                            placeholder="Enter Student ID"
                            value={StudentID}
                            onChange={(e) => setStudentID(e.target.value)}
                            disabled={isEditing}
                            required
                        />
                        <Form.Field
                            control={Input}
                            type="text"
                            label="Student Name"
                            placeholder="Enter Student Name"
                            value={StudentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            type="date"
                            label="Date of Birth"
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                            required
                        />
                        <Form.Field
                            control={Input}
                            type="text"
                            label="Address"
                            placeholder="Enter Address"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            type="text"
                            label="Contact Number"
                            placeholder="Enter Contact Number"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <Form.Field
                            control={Input}
                            type="number"
                            label="Program ID"
                            placeholder="Enter Program ID"
                            value={ProgID}
                            onChange={(e) => setProgID(e.target.value)}
                            required
                        />
                        <Form.Field
                            control={Input}
                            type="number"
                            label="Semester ID"
                            placeholder="Enter Semester ID"
                            value={SemID}
                            onChange={(e) => setSemID(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button primary type="submit">{isEditing ? "Update Student" : "Add Student"}</Button>
                    {isEditing && <Button secondary onClick={resetForm}>Cancel</Button>}
                </Form>
            </Segment>

            <Segment>
                <Header as="h3">Student List</Header>
                <Table celled striped responsive>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Student ID</Table.HeaderCell>
                            <Table.HeaderCell>Student Name</Table.HeaderCell>
                            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Contact Number</Table.HeaderCell>
                            <Table.HeaderCell>Program ID</Table.HeaderCell>
                            <Table.HeaderCell>Semester ID</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Student.map((student) => (
                            <Table.Row key={student.StudentID}>
                                <Table.Cell>{student.StudentID}</Table.Cell>
                                <Table.Cell>{student.StudentName}</Table.Cell>
                                <Table.Cell>{student.DOB}</Table.Cell>
                                <Table.Cell>{student.Address}</Table.Cell>
                                <Table.Cell>{student.Phone}</Table.Cell>
                                <Table.Cell>{student.ProgID}</Table.Cell>
                                <Table.Cell>{student.SemID}</Table.Cell>
                                <Table.Cell>
                                    <Button color="blue" onClick={() => editStudent(student)}>Edit</Button>
                                    <Button color="red" onClick={() => deleteStudent(student.StudentID)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>

            <Segment textAlign='center'>
                <Button color='teal' onClick={addCourseHandler}>Add Course</Button>
            </Segment>

        
        </Container>
    );
};

export default Students;
