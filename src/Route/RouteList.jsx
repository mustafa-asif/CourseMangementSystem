

import React from 'react'
import Courses from '../Frontend/Courses';

import Programm from '../Frontend/Programm';
import Semester from '../Frontend/Semester';
import Students from '../Frontend/Students';

    const RouteList =[
        {
            path: "/",
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
      
       
     
       
      
    
    ];
 


export default RouteList;
