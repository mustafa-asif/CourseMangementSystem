import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";

const Students = () => {
    const [Student,setStudent]=useState([]);
    const [StudentID, setStudentID] = useState();
    const [StudentName, setStudentName] = useState("");
    const [DOB, setDOB] = useState();
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [CourseID,setCourseID]=useState("");
    const [ProgID, setProgID] = useState("");
    const [SemID, setSemID] = useState("");

    const [showCourses,setShowCourses]=useState(false)

  

// routing
    const navigate=useNavigate();

    const addCourseHandler=()=>{
      navigate('/')
  }

    // common courses
    const handleShowCommonCourses=()=>{
        setShowCourses(!showCourses);
    
      }

    // Fetch Students from backend
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Student");
            setStudent(response.data);
            // console.log(setCourse(response.data));
        } catch (error) {
            console.error("Error fetching Student:", error);
        }
    };

    // Add a Student
    const addStudent = async () => {
        try {
            await axios.post("http://localhost:5500/api/Admin/Student", { StudentID,StudentName,DOB,Address,Phone,CourseID,ProgID,SemID },
                {
                    headers: {
                        'Content-Type': 'application/json'  // Set the header for JSON content
                    }
                }
            );
            fetchStudents(); // Refresh course list
            setStudentID();
            setStudentName("");
            setDOB();
            setAddress("");
            setPhone("");
            setCourseID();
            setProgID();
            setSemID();
        } catch (error) {
            console.error("Error adding Students:", error);
        }
    };

    // Delete a Student
    const deleteStudent = async (StudentID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/Student/${StudentID}`);
            fetchStudents(); // Refresh user list
        } catch (error) {
            console.error("Error deleting Student:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // route to add programm
    // const addProgHandler=()=>{
    //     navigate('./Admin/Program')
    // }
    // const addSemHandler=()=>{
    //     navigate('./Admin/Semester')
    // }
   

    return (
        <div>
            <h1>Student Management</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addStudent();
                }}
            >
                <input
                    type="number"
                    placeholder="StudentID"
                    value={StudentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    min={1}
                    required
                />
                <input
                    type="text"
                    placeholder="Student Name"
                    value={StudentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                />
                <input
                    type="Date"
                    placeholder="Date of birth"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    
                    required
                />
                <input
                    type="Text"
                    placeholder="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    
                    required
                />
                <input
                    type="Text"
                    placeholder="Contact number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    
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
                    placeholder="Programm  ID"
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
                <button type="submit">Add Student</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>StudentID</th>
                        <th>Student Name</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>CourseID</th>
                        <th>Program ID</th>
                        <th>Semester ID</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {Student.map((Student) => (
                        <tr key={Student.StudentID}>
                            <td>{Student.StudentID}</td>
                            <td>{Student.StudentName}</td>
                            <td>{Student.DOB}</td>
                            <td>{Student.Address}</td>
                            <td>{Student.Phone}</td>
                            <td>{Student.CourseID}</td>
                            <td>{Student.ProgID}</td>
                            <td>{Student.SemID}</td>
                            <td>
                                <button onClick={() => deleteStudent(Student.StudentID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => (addCourseHandler())}>Add Course</button>
            </div>
            {/* <div>
                <button onClick={() => addSemHandler()}>Add Semester</button>
            </div> */}

            <div className='App'>
      <button onClick={handleShowCommonCourses}>
         {showCourses ?"Hide Courses":"Show Common Courses"}

      </button>
      {showCourses && <SemesterCourses />}
    
      
    </div>
           
        </div>
    );
};

export default Students;
