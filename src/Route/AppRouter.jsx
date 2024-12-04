import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import RouteList from './RouteList';
// import { div } from '@mui/material';



const AppRouter = () => {
    




  return ( <div>

    <Router>
        <Routes>{
            RouteList.map((e,i)=> <Route path={e.path} element={e.element} key={i} />)
            
        }
                 
            
         </Routes>




     </Router>
        </div>
    
    
  )
}

export default AppRouter;