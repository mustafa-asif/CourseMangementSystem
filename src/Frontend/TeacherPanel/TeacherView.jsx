import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherView = () => {
  const [teacherID, setTeacherID] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //route to login page
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
    };

  // Fetch data for the teacher
  const fetchCourses = async () => {
    if (!teacherID) {
      setMessage("Please provide a valid Teacher ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setCourseData([]);

    try {
      const response = await axios.get("http://localhost:5500/api/Teacher/RegisterCourses", {
        params: { teacher_id: teacherID },
      });

      if (response.data.length === 0) {
        setMessage("No data found for the specified Teacher ID.");
      } else {
        setCourseData(response.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred while fetching the data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher - View Registered Courses</h1>

      {/* Teacher ID Input */}
      <div>
        <label>Teacher ID:</label>
        <input
          type="Number"
          value={teacherID}
          onChange={(e) => setTeacherID(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        <button
          onClick={fetchCourses}
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

      {/* Course Data */}
      {courseData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Registered Courses and Students</h2>
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Semester</th>
                <th>Program</th>
                <th>TeacherName</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((item, index) => (
                <tr key={index}>
                  <td>{item.StudentID}</td>
                  <td>{item.StudentName}</td>
                  <td>{item.CourseID}</td>
                  <td>{item.CourseName}</td>
                  <td>{item.SemesterName}</td>
                  <td>{item.ProgramName}</td>
                  <td>{item.TeacherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <button onClick={handleLogin}>Back to login</button>
      </div>
    </div>
  );
};

export default TeacherView;
