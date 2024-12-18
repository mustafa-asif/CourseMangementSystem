

import React from 'react'
import Courses from '../Frontend/Courses';

import Programm from '../Frontend/Programm';
import Semester from '../Frontend/Semester';
import Students from '../Frontend/Students';
import Teachers from '../Frontend/Teachers';
import RegisterCourse from '../Frontend/StudentPortal/RegisterCourse';
import ViewCourses from '../Frontend/StudentPortal/ViewCourses';
import HomePage from '../Frontend/Origin/HomePage';

    const RouteList =[
        {
            path: "/",
            element: <HomePage /> 
        },
        {
            path: "/Admin/Courses",
            element: <Courses /> 
        },
      
        {
            path :'/Admin/Semester',
            element:<Semester />
        },
        {
            path :'/Admin/Program',
            element:<Programm />
        },
        {
            path :'/Admin/Student',
            element:<Students />
        },
        {
            path :'/Admin/Teacher',
            element:<Teachers />
        },
        {
            path: '/Student/StudentPortal',
            element: <RegisterCourse />
        },
        {
            path: '/Student/ViewCourses',
            element: <ViewCourses />
        }
      
       
     
       
      
    
    ];
 


export default RouteList;
