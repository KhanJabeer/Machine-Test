import React,{useState} from "react";
import './Login.css'



const Login = ({ users,changeAuth,history }) => {
  const[emailError,setEmailError]=useState(false)
  const[passError,setPassError]=useState(false)

const handleSubmit =(e)=>{
  e.preventDefault()
   
    const validUser = users && users.findIndex(user => user.email === loginData.email && user.password === loginData.password)
    if(validUser !== -1) {
      localStorage.setItem("loggedInUser",JSON.stringify(users[validUser]))
      changeAuth()
      history.push("/dashboard")
    }else {
      alert("Invalid email or password")
    
    }
   
  
}   

const [loginData,setLoginData] = useState({email:"",password:""})

const {email,password} = loginData;

const handleChange = (e) => {
  setLoginData({...loginData,[e.target.name]:e.target.value})
 setEmailError(false)
 setPassError(false)
}
const validate = (e)=>{
  e.preventDefault()
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
 
 if(loginData && loginData.email === "" ) {
    setEmailError("Field Required")
    } else if(re.test(loginData && loginData.email) === false ){
      setEmailError("Please Include @ . in the Email Address")
    }
 
    
  if(loginData.password === ""){
    setPassError("Field Required")
  }
  handleSubmit(e)
}

  return(
    <div className="login_content">
        <header>
      <h1>Machine Test</h1>
          <h1>Login</h1>
        </header>

        <form  onSubmit={handleSubmit}>
            <div className="login_fields">
                <input 
                className="input_boxes"
                type="email" 
                name="email" 
                value={email}
                placeholder="Email" 
                onChange={(e) => handleChange(e)}
              />
                <div className="err_msg">{emailError }</div>
            </div>
 

            <div className="login_fields">
                <input 
                className="input_boxes"
                type="password" 
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => handleChange(e)}
               />
                <div className="err_msg">{passError}</div>
            </div>
           
            <div className="login_btn">
            <button onClick={(e)=>validate(e)}>Login</button>
            </div>
        </form>
    </div>
  )
  }


export default Login;