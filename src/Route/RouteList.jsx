

import React from 'react'
import Courses from '../Frontend/Courses';

import Programm from '../Frontend/Programm';
import Semester from '../Frontend/Semester';
import Students from '../Frontend/Students';
import Teachers from '../Frontend/Teachers';

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
        {
            path :'/Admin/Teacher',
            element:<Teachers />
        }
      
       
     
       
      
    
    ];
 


export default RouteList;
