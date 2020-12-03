import React from "react";
import {Route,Redirect} from "react-router-dom";


const PrivateRoute = ({ component:Component,isAuthenticated,loggedInUser, ...rest }) => {

return(
    <Route 
    {...rest} 
    render={ (props) => !isAuthenticated && isAuthenticated !== null  ? 
    (<Redirect to="/" />) 
     :
    (
     <Component {...props} loggedInUser={loggedInUser} />
    ) 

     }
     />
)
   

    }
           
               


export default PrivateRoute;
