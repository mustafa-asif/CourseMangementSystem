

import React from 'react'
import Courses from '../Frontend/Courses';

import Programm from '../Frontend/Programm';
import Semester from '../Frontend/Semester';

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
      
       
     
       
      
    
    ];
 


export default RouteList;
