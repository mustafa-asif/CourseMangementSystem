

import React from 'react'
import UserManagement from '../Frontend/userManagement';

import Programm from '../Frontend/Programm';
import Semester from '../Frontend/Semester';







    const RouteList =[
        {
            path: "/",
            element: <UserManagement /> 
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
