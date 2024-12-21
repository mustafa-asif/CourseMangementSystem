
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";

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
        <div>
            <h1>Teacher Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="TeacherID"
                    value={TeacherID}
                    onChange={(e) => setTeacherID(e.target.value)}
                    min={1}
                    required
                    disabled={isEditing} // Disable ID when editing
                />
                <input
                    type="text"
                    placeholder="Teacher Name"
                    value={TeacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Date of Joining"
                    value={DOJ}
                    onChange={(e) => setDOJ(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={Status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={Salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Profession"
                    value={Job}
                    onChange={(e) => setJob(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Course ID"
                    value={CourseID}
                    onChange={(e) => setCourseID(e.target.value)}
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
                <button type="submit">{isEditing ? "Update Teacher" : "Add Teacher"}</button>
                {isEditing && <button onClick={resetForm}>Cancel</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>TeacherID</th>
                        <th>Teacher Name</th>
                        <th>Date of Joining</th>
                        <th>Status</th>
                        <th>Salary </th>
                        <th>Job </th>
                        <th>CourseID</th>
                        <th>Program ID</th>
                        <th>Semester ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Teacher.map((teacher) => (
                        <tr key={teacher.TeacherID}>
                            <td>{teacher.TeacherID}</td>
                            <td>{teacher.TeacherName}</td>
                            <td>{teacher.DOJ}</td>
                            <td>{teacher.Status}</td>
                            <td>{teacher.Salary}</td>
                            <td>{teacher.Job}</td>
                            <td>{teacher.CourseID}</td>
                            <td>{teacher.ProgID}</td>
                            <td>{teacher.SemID}</td>
                            <td>
                                <button onClick={() => editTeacher(teacher)}>Edit</button>
                                <button onClick={() => deleteTeachers(teacher.TeacherID)}>Delete</button>
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

export default Teachers;

