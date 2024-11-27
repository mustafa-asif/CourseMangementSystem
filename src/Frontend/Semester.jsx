
import React, { useState, useEffect } from "react";
import axios from "axios";

const Semester = () => {
    const [Semester, setSemester] = useState([]);
    const [semseterID, setID] = useState("");
    const [semesterName, setName] = useState("");
    

    // Fetch Semester from backend
    const fetchSemester = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Semester");
            console.log(response);
            setSemester(response.data);
            // console.log(setSemester(response.data));
        } catch (error) {
            console.error("Error fetching Semester:", error);
        }
    };

    // Add a semester
    const addSemester = async () => {
        try {
            const recive=await axios.post("http://localhost:5500/api/Admin/Semester", 
                { semseterID, semesterName },  // Send the data as JSON
                {
                    headers: {
                        'Content-Type': 'application/json'  // Set the header for JSON content
                    }
                }
            );
            console.log(recive);
            fetchSemester(); // Refresh Semester list
            setID();
            setName("");  // Clear the form fields after adding
        } catch (error) {
            console.error("Error adding Semester:", error);
        }
    };
    

    // Delete a Course
    // const deleteCourse = async (CourseID) => {
    //     try {
    //         await axios.delete(`http://localhost:5500/api/Admin/Course/${CourseID}`);
    //         fetchCourses(); // Refresh user list
    //     } catch (error) {
    //         console.error("Error deleting user:", error);
    //     }
    // };

    useEffect(() => {
        fetchSemester();
    }, []);

    return (
        <div>
            <h1>Semester Management</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addSemester();
                }}
            >
                <input
                    type="number"
                    placeholder="SemesterID"
                    value={semseterID}
                    onChange={(e) => setID(e.target.value)}
                    min={1}
                    required
                />
                <input
                    type="text"
                    placeholder="Semester Name"
                    value={semesterName}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
              
                <button type="submit">Add Semester</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Semester ID</th>
                        <th>Semester Name</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {Semester.map((sem) => (
                        <tr key={sem.semseterID}>
                            <td>{sem.semseterID}</td>
                            <td>{sem.semesterName}</td>
                           
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Semester;

