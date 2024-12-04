import logo from './logo.svg';
import './App.css';

import SemesterCourses from './Frontend/SemesterCourses.jsx';
import { useState } from 'react';
import AppRouter from './Route/AppRouter.jsx';

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

   
   
    
    </div>
  );
}

export default App;
