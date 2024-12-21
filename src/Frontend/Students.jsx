
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";

const Students = () => {
    const [Student, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState();
    const [StudentName, setStudentName] = useState("");
    const [DOB, setDOB] = useState();
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    
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
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Student");
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching Student:", error);
        }
    };

    // Add or Update a Student
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { StudentID, StudentName, DOB, Address, Phone, ProgID, SemID };

        try {
            if (isEditing) {
                // Update Student
                await axios.put(`http://localhost:5500/api/Admin/Student/${editID}`, payload, {
                    headers: { "Content-Type": "application/json" },
                });
                setIsEditing(false); // Exit edit mode
                setEditID(null);
            } else {
                // Add Student
                await axios.post("http://localhost:5500/api/Admin/Student", payload, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            fetchStudents(); // Refresh list
            resetForm(); // Reset form after submission
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    // Delete a Student
    const deleteStudent = async (StudentID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/Student/${StudentID}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting Student:", error);
        }
    };

    // Edit a Student
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

    // Reset Form
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
        <div>
            <h1>Student Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="StudentID"
                    value={StudentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    min={1}
                    required
                    disabled={isEditing} // Disable ID when editing
                />
                <input
                    type="text"
                    placeholder="Student Name"
                    value={StudentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
              
                <input
                    type="number"
                    placeholder="Program ID"
                    value={ProgID}
                    onChange={(e) => setProgID(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Semester ID"
                    value={SemID}
                    onChange={(e) => setSemID(e.target.value)}
                    required
                />
                <button type="submit">{isEditing ? "Update Student" : "Add Student"}</button>
                {isEditing && <button onClick={resetForm}>Cancel</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>StudentID</th>
                        <th>Student Name</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        
                        <th>Program ID</th>
                        <th>Semester ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Student.map((student) => (
                        <tr key={student.StudentID}>
                            <td>{student.StudentID}</td>
                            <td>{student.StudentName}</td>
                            <td>{student.DOB}</td>
                            <td>{student.Address}</td>
                            <td>{student.Phone}</td>
                            
                            <td>{student.ProgID}</td>
                            <td>{student.SemID}</td>
                            <td>
                                <button onClick={() => editStudent(student)}>Edit</button>
                                <button onClick={() => deleteStudent(student.StudentID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => addCourseHandler()}>Add Course</button>
            </div>

            <div className="App">
                <button onClick={handleShowCommonCourses}>
                    {showCourses ? "Hide Courses" : "Show  Courses"}
                </button>
                {showCourses && <SemesterCourses />}
            </div>
        </div>
    );
};

export default Students;

