import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewCourses = () => {
  const [studentID, setStudentID] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // navigate back to registered Courses
  const navigate = useNavigate();

  const handlerStudentPortal=()=>{
    navigate('/Student/StudentPortal');
  }

  // Fetch courses for the given StudentID
  const fetchStudentCourses = async () => {
    if (!studentID) {
      setMessage("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setStudentData(null);

    try {
      const response = await axios.get(`http://localhost:5500/api/Student/viewCourses`, {
        params: { StudentID: studentID },
      });
      setStudentData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("No courses found for the specified Student ID.");
      } else {
        setMessage("An error occurred while fetching the data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>View Student Courses</h1>

      {/* Student ID Input */}
      <div>
        <label>Student ID:</label>
        <input
          type="number"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        <button
          onClick={fetchStudentCourses}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Message */}
      {message && <p style={{ color: "red", marginTop: "20px" }}>{message}</p>}

      {/* Student Data */}
      {studentData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Student Information</h2>
          <p><strong>Student ID:</strong> {studentData.StudentID}</p>
          <p><strong>Student Name:</strong> {studentData.StudentName}</p>
          <p><strong>Program:</strong> {studentData.Program}</p>
          <p><strong>Semester:</strong> {studentData.Semester}</p>

          <h3>Registered Courses</h3>
          <table border="1" style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Theory Credit Hours</th>
                <th>Lab Credit Hours</th>
              </tr>
            </thead>
            <tbody>
              {studentData.Courses.map((course) => (
                <tr key={course.CourseID}>
                  <td>{course.CourseID}</td>
                  <td>{course.CourseName}</td>
                  <td>{course.CreditHrTh}</td>
                  <td>{course.CreditHrLab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <button onClick={handlerStudentPortal}>
            Registerd Courses
        </button>
      </div>
    </div>
  );
};

export default ViewCourses;
