import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Programm = () => {
  const [Program,setProgram]=useState([]);
  const [ProgID,setProgID]=useState("")
  const [ProgName,setProgName]=useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");

  // route to add courses
  const navigate=useNavigate();

  const handleAddCourse = () => {
    navigate('/');
  }

  // fetch programm from backend

  const fetchProgramm = async ()=>{
    try {
        const response = await axios.get("http://localhost:5500/api/Admin/Program");
        // console.log(response);
        setProgram(response.data);
        setLoading(false)
        // console.log(setSemester(response.data));
    } catch (error) {
        console.error("Error fetching programm:", error);
        setError("Error fetching Programm".error);
        setLoading(false)
    }
  };

  // adding programm
  const addProgram = async () => {
    try {
        const recive=await axios.post("http://localhost:5500/api/Admin/Program", 
            { ProgID, ProgName },  // Send the data as JSON
            {
                headers: {
                    'Content-Type': 'application/json'  // Set the header for JSON content
                }
            }
        );
        console.log(recive);
        fetchProgramm(); // Refresh Semester list
        setProgID();
        setProgName("");  // Clear the form fields after adding
    } catch (error) {
        console.error("Error adding programm:", error);
    }
};

// delete programm
const deleteProgramm = async (CourseID) => {
  try {
      await axios.delete(`http://localhost:5500/api/Admin/Program/${CourseID}`);
      fetchProgramm(); // Refresh user list
  } catch (error) {
      console.error("Error deleting programm:", error);
  }
};

      useEffect(()=>{
        fetchProgramm();
      },[]);

  return (
    <div>
            <h1>Programm Management</h1>
            {loading && <p>Loading courses...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addProgram();
                     // setLoading(false)
                }}
                >
                <input
                    type="number"
                    placeholder="programm ID"
                    value={ProgID}
                    onChange={(e) => setProgID(e.target.value)}
                    min={1}
                    required
                    />
                <input
                    type="text"
                    placeholder="programm Name"
                    value={ProgName}
                    onChange={(e) => setProgName(e.target.value)}
                    required
                    />
              
                <button type="submit">Add Programm</button>
            </form>
                    {!loading && !error && (

            <table>
                <thead>
                    <tr>
                        <th>Pogramm ID</th>
                        <th>Programm Name</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {Program.map((Program) => (
                        <tr key={Program.ProgID}>
                            <td>{Program.ProgID}</td>
                            <td>{Program.ProgName}</td>
                           
                            <td>
                                <button onClick={()=>{
                                    deleteProgramm(Program.ProgID);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            <div>
              <button onClick={handleAddCourse}>Add courses</button>
            </div>
        </div>
  );
}

export default Programm;
