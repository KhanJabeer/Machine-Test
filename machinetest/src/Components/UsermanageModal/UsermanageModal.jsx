import React,{useState,useEffect} from "react";
import './UsermanageModal.css'
import { uuid } from 'uuidv4';
import Input from "../../formComponent/Input";
import ValidationLibrary from "../../formComponent/validation";


const UserManageModal = ({ add,users,userId,onClose }) => {

    const [userData,setUserData] = useState({
        "name":{
            value:"",
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        "email":{
            value:"",
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        "address":{
            value:"",
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        "country":{
            value:"",
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
    })
    
    const [checkStatus,setStatus] = useState({status:"active"})
    const [userIndex,setIndex] = useState(null)

    const {name,email,address,country,role} = userData;

    const {status} = checkStatus;

    const handleChange = (e) =>  setStatus({[e.target.name]:e.target.value})

  
     

    useEffect(() => {
        if(!add) {
            const findUser = users && users.find(user => user.userId === userId)
            const findIndex = users && users.map(user => user.userId).indexOf(userId)

            setIndex(findIndex)

            const {name,email,address,country,status,role} = findUser;
            setUserData({
                "name":{
                    value:name,
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },"email":{
                    value:email,
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },"address":{
                    value:address,
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },"country":{
                    value:country,
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                }
            })

            setStatus({status})
        }
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();

        var userDataValues = userData;
        var targetkeys = Object.keys(userDataValues);

        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            userDataValues[targetkeys[i]].value,
            userDataValues[targetkeys[i]].validation
          );
          userDataValues[targetkeys[i]].error = !errorcheck.state;
          userDataValues[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) => userDataValues[obj].error === true);
        if (filtererr.length > 0) {
        
          setUserData({...userDataValues})
        } 
        if (filtererr.length === 0) {
         
             submitUser()
        } 
    }

    const submitUser = () => {
      
        const {name,email,address,country,role} = userData;
        const {status} = checkStatus;


        let validUser =  users && users.find(user => user.email === email.value)

         if(add && validUser) {
             alert("User already exists")
         }

        //  Add user
         if(add && !validUser) {
              users && users.push({userId:uuid(),name:name.value,email:email.value,address:address.value,country:country.value,status,role:"user"})
              localStorage.setItem("users",JSON.stringify(users))
              onClose();
         }

        //  Edit user
        if(!add) {
         const editUser = users.some((user,index) => { 
             return userIndex !== index && user.email === email.value
         })
        
        
         if(!editUser) {
         users[userIndex].name = name.value;
         users[userIndex].email = email.value;
         users[userIndex].address = address.value;
         users[userIndex].country = country.value;
         users[userIndex].status = status;
         users[userIndex].role = "user";
        
         localStorage.setItem("users",JSON.stringify(users))
         onClose()
     }else{
         alert("user already exists")
     }
}
    }

 

   const changeDynamic = (data, key) => {
        let userDataValues = userData;
        let targetkeys = Object.keys(userDataValues);

        var errorcheck = ValidationLibrary.checkValidation(data, userDataValues[key].validation);
        userDataValues[key].value = data;
        userDataValues[key].error = !errorcheck.state;
        userDataValues[key].errmsg = errorcheck.msg;
        setUserData({ ...userData,userDataValues });
        var filtererr = targetkeys.filter((obj) =>
            userDataValues[obj].error === true || userDataValues[obj].error == null);
        if (filtererr.length > 0) {
            
        } else {
           
        }
        
    }

  return(
    <div className="modal">
     <div className="modal_title">{ add ? "ADD USER" : "EDIT USER" }</div>
     <div className="divider"/>
     <form onSubmit={(e) => handleSubmit(e)}>

     <div className="grid-container">

     <div className="grid-item">
         
         <Input label={"Name"} className="userdata_fields" type="text" name="name" value={name.value} changeData={(data) => changeDynamic(data,"name")} error={name.error} errmsg={name.errmsg}  />
     </div>

     <div className="grid-item">
   
         <Input label={"Email"} className="userdata_fields" type="email" name="email" value={email.value} changeData={(data) => changeDynamic(data,"email")}  error={email.error} errmsg={email.errmsg}   />
     </div>

     <div className="grid-item">
      
         <Input label={"Address"} className="userdata_fields" type="text" name="address" value={address.value} changeData={(data) => changeDynamic(data,"address")}  error={address.error} errmsg={address.errmsg}   />
     </div>

     <div className="grid-item">
         <Input label={"Country"} className="userdata_fields" type="text" name="country" value={country.value} changeData={(data) => changeDynamic(data,"country")}  error={country.error} errmsg={country.errmsg}   />
     </div>

     <div className="grid-item">
         <div className="field_label">Status</div>
         <select className="status_fields" name="status" value={status}  onChange={(e) => handleChange(e)} >
            <option value="active">Active</option>
            <option value="inactive">In-Active</option>
        </select>     
        </div>


    </div>


  
    <div className="btn_wraps">
        <button className="cancel_btn" onClick={() => onClose()}>Cancel</button>    
        <button className="addedit_btn" type="submit" >{add ? "ADD" : "UPDATE"}</button>
    </div>
    </form>
    </div>
  )
  }


export default UserManageModal;