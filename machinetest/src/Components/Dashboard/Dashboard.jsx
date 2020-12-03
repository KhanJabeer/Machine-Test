import React,{useEffect,useState} from "react";
import './Dashboard.css'
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";


const Dashboard = ({ loggedInUser,history }) => {

  console.log("loggedInUserCheck",loggedInUser)

  const [userDetails,setUserDetails] = useState([])

  const [currId,setCurrId] = useState(null)

  useEffect(() => {
    loadUserDetails()
},[])


const loadUserDetails = () => {
  if(localStorage.users) {
    const user = JSON.parse(localStorage.getItem("users"))
    setUserDetails(user)
  }

  if(localStorage.loggedInUser) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
  
    setCurrId(user.userId)
  }
}


const logout = () => {
  localStorage.setItem("loggedInUser","")
  history.push("/")
}

   

  return(
    <div>      
       <header>
           <div className="dash_title">
             <div>Welcome To Dashboard</div>

       {loggedInUser && loggedInUser.role !== "user" && <div>
              <Link to="/usermanage" className="link_header">User Management</Link>
           </div>}

           <div className="logout_btn" >
             <div className="logged_user">{loggedInUser && loggedInUser.name}</div>
              <button onClick={logout}>Log out</button>
           </div>

           </div>
        </header>

           <div className="dash_content">

           <div className="userstatus_header">User List<span>Status</span></div>
            {userDetails && userDetails.length > 0 && userDetails.map((user) => {
              return(
                user.role === "user" && user.userId !== currId && <div className="user_status">{user.name}<span>{user.status}</span></div>
              )
            })}
           </div>
    </div>
  )
  }


export default Dashboard;