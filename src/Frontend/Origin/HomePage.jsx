

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

    //rouye to courses
    const handleCourses = () => {
      navigate('/Admin/courses')
    }

    // route to Student portal
    const handleStudentPortal =()=>{
      navigate('/Student/StudentPortal')
    }

  return (
    <div>
      <div>

      <button onClick={handleCourses}>Courses</button>
      </div>
      <div>
        <button onClick={handleStudentPortal}>Student Portal</button>
      </div>
      
    </div>
  );
}

export default HomePage;
