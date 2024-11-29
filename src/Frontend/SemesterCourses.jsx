
import  { React,useEffect,useState } from 'react';
import axios from 'axios';

const SemesterCourses = () => {
  const [commonCourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");

  const fetchCommonCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Admin/CommonCourses");
      setCourses(response.data)
      console.log(response.data);
      setLoading(false)
      
    } catch (error){
      setError("error fetching courses",error); 
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchCommonCourses();
  },[])


  return (
    <div>
       <h1>Common Semester</h1>

{loading && <p>Loading courses...</p>}

{error && <p style={{ color: "red" }}>{error}</p>}

{!loading && !error && (
        <table>
                <thead>
                    <tr>
                        <th>CourseID</th>
                        <th>Course Name</th>
                        <th>Credit Hours Theory</th>
                        <th>Credit Hours Lab</th>
                        <th>Semester ID</th>
                        <th>Semester Name</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {commonCourses.map((Course) => (
                        <tr key={Course.CourseID}>
                            <td>{Course.CourseID}</td>
                            <td>{Course.CourseName}</td>
                            <td>{Course.CreditHrTh}</td>
                            <td>{Course.CreditHrLab}</td>
                            <td>{Course.SemesterID}</td>
                            <td>{Course.SemesterName}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
          )}
      
    </div>
  );
};

export default SemesterCourses;
