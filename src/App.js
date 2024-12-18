import logo from './logo.svg';
import './App.css';

import SemesterCourses from './Frontend/SemesterCourses.jsx';
import { useState } from 'react';
import AppRouter from './Route/AppRouter.jsx';
import RegisterCourse from './Frontend/StudentPortal/RegisterCourse.jsx';

function App() {

  const [showCourses,setShowCourses]=useState(false)

  const handleClick=()=>{
    setShowCourses(!showCourses);

  }
  return (
    <div >

      <div>
        <AppRouter />
      </div>

      <div>
        <RegisterCourse />
      </div>

   
   
    
    </div>
  );
}

export default App;
