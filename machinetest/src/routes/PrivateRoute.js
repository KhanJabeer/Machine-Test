import React,{useEffect} from "react";
import {Route,Redirect,withRouter} from "react-router-dom";


const PrivateRoute = ({ component:Component,isAuthenticated,loggedInUser,history,...rest }) => {

    useEffect(() => {
    loggedInUser && (window.location.pathname === "/usermanage" && "/post")  && loggedInUser.role === "user" && history.push("/dashboard" && "/post")
    },[loggedInUser,history])

return(
    <Route 
    {...rest} 
    render={ (props) => !isAuthenticated && isAuthenticated !== null ? 
    (<Redirect to="/" />) 
     : 
    (
      
      <Component {...props} loggedInUser={loggedInUser} />
    ) 

     }
     />
)
   

    }
           
               


export default withRouter(PrivateRoute);
