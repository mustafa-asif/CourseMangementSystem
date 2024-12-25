
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";
import { 
    Button, 
    Form, 
    Input,
     Table,
      Header,
      Container, 
      Segment } from 'semantic-ui-react';

const Teachers = () => {
    const [Teacher, setTeacher] = useState([]);
    const [TeacherID, setTeacherID] = useState();
    const [TeacherName, setTeacherName] = useState("");
    const [DOJ, setDOJ] = useState();
    const [Status, setStatus] = useState("");
    const [Salary, setSalary] = useState("");
    const [Job, setJob] = useState("");
    const [CourseID, setCourseID] = useState("");
    const [ProgID, setProgID] = useState("");
    const [SemID, setSemID] = useState("");
    const [isEditing, setIsEditing] = useState(false); // State to track edit mode
    const [editID, setEditID] = useState(null); // Track which student is being edited

    const [showCourses, setShowCourses] = useState(false);

    const navigate = useNavigate();

    // Routing
    const addCourseHandler = () => {
        navigate("/Admin/Courses");
    };

    // Show Common Courses
    const handleShowCommonCourses = () => {
        setShowCourses(!showCourses);
    };

    // Fetch Students from backend
    const fetchTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/teachers");
            setTeacher(response.data);
        } catch (error) {
            console.error("Error fetching Teachers:", error);
        }
    };

    // Add or Update a Teacher
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { TeacherID, TeacherName, DOJ, Status, Salary,Job, CourseID, ProgID, SemID };

        try {
            if (isEditing) {
                // Update Teacher
                await axios.put(`http://localhost:5500/api/Admin/teachers/${editID}`, payload, {
                    headers: { "Content-Type": "application/json" },
                });
                setIsEditing(false); // Exit edit mode
                setEditID(null);
            } else {
                // Add Teacher
                await axios.post("http://localhost:5500/api/Admin/teachers", payload, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            fetchTeachers(); // Refresh list
            resetForm(); // Reset form after submission
        } catch (error) {
            console.error("Error saving Teacher:", error);
        }
    };

    // Delete a Teachers
    const deleteTeachers = async (TeacherID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/teachers/${TeacherID}`);
            fetchTeachers();
        } catch (error) {
            console.error("Error deleting Teacher:", error);
        }
    };

    // Edit a Teacher
    const editTeacher = (teacher) => {
        setIsEditing(true);
        setEditID(teacher.TeacherID);
        setTeacherID(teacher.TeacherID);
        setTeacherName(teacher.TeacherName);
        setDOJ(teacher.DOJ);
        setStatus(teacher.Status);
        setSalary(teacher.Salary);
        setJob(teacher.Job);
        setCourseID(teacher.CourseID);
        setProgID(teacher.ProgID);
        setSemID(teacher.SemID);
    };

    // Reset Form
    const resetForm = () => {
        setTeacherID("");
        setTeacherName("");
        setDOJ("");
        setStatus("");
        setSalary("");
        setJob("");
        setCourseID("");
        setProgID("");
        setSemID("");
        setIsEditing(false);
        setEditID(null);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <Container style={{ marginTop: '3rem', backgroundColor: '#f7f8fa', padding: '2rem', borderRadius: '8px' }}>
                   <Header as="h1" textAlign="center">Teacher Management</Header>
            <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                <Form.Field
                        control={Input}
                        type="number"
                        label="Teacher ID"
                        placeholder="TeacherID"
                        value={TeacherID}
                        onChange={(e) => setTeacherID(e.target.value)}
                        min={1}
                        required
                        disabled={isEditing} // Disable ID when editing
                        />
                <Form.Field
                        control={Input}
                        label="Teacher Name"
                        type="text"
                        placeholder="Teacher Name"
                        value={TeacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required
                        />

                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field 
                        control={Input}
                        label="Date of Join"
                        type="date"
                        placeholder="Date of Joining"
                        value={DOJ}
                        onChange={(e) => setDOJ(e.target.value)}
                        required
                     />

                    <Form.Field
                        control={Input}
                        label="Status"
                        type="text"
                        placeholder="Status"
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                     />
                    <Form.Field
                        control={Input}
                        label="Salary"
                        type="number"
                        placeholder="Salary"
                        value={Salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                     /> 
                </Form.Group >
                <Form.Group widths="equal">
                    <Form.Field
                        control={Input}
                        label="Profession"
                        type="text"
                        placeholder="Profession"
                        value={Job}
                        onChange={(e) => setJob(e.target.value)}
                        required
                     />
                    <Form.Field 
                       control={Input}
                       label="CourseID"
                       type="number"
                       placeholder="Course ID"
                       value={CourseID}
                       onChange={(e) => setCourseID(e.target.value)}
                       required
                     />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field
                        control={Input}
                        label="Programm ID"
                        type="number"
                        placeholder="Program ID"
                        value={ProgID}
                        onChange={(e) => setProgID(e.target.value)}
                        required
                     />

                    <Form.Field
                     
                        control={Input}
                        label="Semester ID"
                        type="number"
                        placeholder="Semester ID"
                        value={SemID}
                        onChange={(e) => setSemID(e.target.value)}
                        required
                     />
                </Form.Group>

                <Button primary type="submit">{isEditing ? "Update Teacher" : "Add Teacher"}</Button>
                {isEditing && <Button secondary onClick={resetForm}>Cancel</Button>}
        </Form>
        </Segment>

        <Segment>
            <Header as="h2" textAlign="center">Teacher List</Header>
            <Table celled>
                <Table.Header>
                         <Table.Row>
                                <Table.HeaderCell>Teacher ID</Table.HeaderCell>
                                <Table.HeaderCell>Teacher Name</Table.HeaderCell>
                                <Table.HeaderCell>Date of Joining</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Salary </Table.HeaderCell>
                                <Table.HeaderCell>Profession </Table.HeaderCell>
                                <Table.HeaderCell>Course ID </Table.HeaderCell>
                                <Table.HeaderCell>Program ID</Table.HeaderCell>
                                <Table.HeaderCell>Semester ID</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                </Table.Header>
                <Table.Body>
                {Teacher.map((teacher) => (
                        <Table.Row key={teacher.TeacherID}>
                            <Table.Cell>{teacher.TeacherID}</Table.Cell>
                            <Table.Cell>{teacher.TeacherName}</Table.Cell>
                            <Table.Cell>{teacher.DOJ}</Table.Cell>
                            <Table.Cell>{teacher.Status}</Table.Cell>
                            <Table.Cell>{teacher.Salary}</Table.Cell>
                            <Table.Cell>{teacher.Job}</Table.Cell>
                            <Table.Cell>{teacher.CourseID}</Table.Cell>
                            <Table.Cell>{teacher.ProgID}</Table.Cell>
                            <Table.Cell>{teacher.SemID}</Table.Cell>
                            <Table.Cell>
                                <Button color="blue" onClick={() => editTeacher(teacher)}>Edit</Button>
                                <Button color="red" onClick={() => deleteTeachers(teacher.TeacherID)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                         ))}

                </Table.Body>


            </Table>


        </Segment>

        <Segment>
        
            <Button  color="teal" onClick={() => addCourseHandler()}>Add Course</Button>
            
        </Segment>
            
        </Container>
    );
};

export default Teachers;

