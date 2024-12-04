import logo from './logo.svg';
import './App.css';
import UserManagement from './Frontend/userManagement.jsx';
import Semester from './Frontend/Semester.jsx';
import SemesterCourses from './Frontend/SemesterCourses.jsx';
import { useState } from 'react';
import Programm from './Frontend/Programm.jsx';
function App() {

  const [showCourses,setShowCourses]=useState(false)

  const handleClick=()=>{
    setShowCourses(!showCourses);

  }
  return (
    <div >
    <div className="App">
      <UserManagement />
    </div>
    <div className='App'>
      <Semester />
    </div>
    <div className='App'>
      <Programm />
    </div>
    <div className='App'>
      <button onClick={handleClick}>
         {showCourses ?"Hide Courses":"Show Courses"}

      </button>
      {showCourses && <SemesterCourses />}
    
      
    </div>
    
    </div>
  );
}

export default App;
