import React,{useState} from "react";
import './Login.css'



const Login = ({ users,changeAuth,history }) => {
  const[emailError,setEmailError]=useState({})
  const[passError,setPassError]=useState({})

const handleSubmit =(e)=>{
 
  e.preventDefault()
    const isValid = validate();
    if(isValid == true){
     const validUser = users && users.findIndex(user => user.email === loginData.email && user.password === loginData.password)
    if(validUser !== -1) {
      localStorage.setItem("loggedInUser",JSON.stringify(users[validUser]))
      changeAuth()
      history.push("/dashboard")
    }else {
      alert("Invalid email or password")  
    }
   
  }
}   

const [loginData,setLoginData] = useState({email:"",password:""})

const {email,password} = loginData;

const handleChange = (e) => {
  setLoginData({...loginData,[e.target.name]:e.target.value})
 
}


const validate = ()=>{
  
 const emailError={};
 const passError={};
  let isValid=true;

 if(loginData && loginData.email === "" ) {
  emailError.emailEmpty="Field Required"
    isValid=false;
    } 
  if(loginData.email.length >0 && !loginData.email.includes("@") ){
    emailError.emailMissing="Please Include @ . in the Email Address"
      isValid=false;
    }
 
    
  if(loginData.password === ""){
    passError.passEmpty="Field Required"
    isValid=false;
  }
    setEmailError(emailError)
    setPassError(passError)
    return isValid
   
}
//object.keys or value insteade of mapping storing each object this is better
  return(
    <div className="login_content">
        <header>
      <h1>Machine Test</h1>
          <h1>Login</h1>
        </header>

        <form  onSubmit={handleSubmit} autocomplete="off" >
            <div className="login_fields">
                <input 
                className="input_boxes"
                type="email" 
                name="email" 
                value={email}
                placeholder="Email" 
                onChange={(e) => handleChange(e)}
                autocomplete="false"
              />
               {Object.keys(emailError).map((key)=>{
                 return <div className="err_msg">{emailError[key]}</div>
               })}
            </div>
 

            <div className="login_fields">
                <input 
                className="input_boxes"
                type="password" 
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                autocomplete="false"
               />
                {Object.keys(passError).map((key)=>{
                 return <div className="err_msg">{passError[key]}</div>
               })}
            </div> 
            
          
           
            <div className="login_btn">
             <button onClick={handleSubmit}>Login</button>
            </div>
        </form>
    </div>
  )
  }


export default Login;