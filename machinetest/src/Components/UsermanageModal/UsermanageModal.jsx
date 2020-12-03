import React,{useState,useEffect} from "react";
import './UsermanageModal.css'
import { uuid } from 'uuidv4';


const UserManageModal = ({ add,users,userId,onClose }) => {

    const [userData,setUserData] = useState({
        name:"",
        email:"",
        address:"",
        country:"",
        status:"active",
        role:"user"
    })
    
    const [userIndex,setIndex] = useState(null)

    const {name,email,address,country,status,role} = userData;

    const handleChange = (e) => {
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        if(!add) {
            const findUser = users && users.find(user => user.userId === userId)
            const findIndex = users && users.map(user => user.userId).indexOf(userId)

            setIndex(findIndex)

            console.log("sdfkjsahdfjasd",findIndex)
            const {name,email,address,country,status,role} = findUser;
            setUserData({
                name,email,address,country,status,role
            })
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(add) {
            users && users.push({userId:uuid(),name,email,address,country,status,role})
            localStorage.setItem("users",JSON.stringify(users))
            onClose();
        }else {
            users[userIndex].name = name;
            users[userIndex].email = email;
            users[userIndex].address = address;
            users[userIndex].country = country;
            users[userIndex].status = status;
            users[userIndex].role = role;

            localStorage.setItem("users",JSON.stringify(users))
            onClose()
        }
        console.log("asdfjsadhfjhads",users)
    }

    const resetForm = () => {
        setUserData({
            name:"",
            email:"",
            address:"",
            country:"",
            status:"active",
            role:"user"
        })
    }

  return(
    <div className="modal">
     <div className="modal_title">{ add ? "ADD USER" : "EDIT USER" }</div>
     <div className="divider"/>
     <form onSubmit={(e) => handleSubmit(e)}>

     <div className="grid-container">

     <div className="grid-item">
         <div className="field_label">Name</div>
         <input className="userdata_fields" type="text" name="name" value={name} onChange={(e) => handleChange(e)} required />
     </div>

     <div className="grid-item">
         <div className="field_label">Email</div>
         <input className="userdata_fields" type="email" name="email" value={email} onChange={(e) => handleChange(e)} required />
     </div>

     <div className="grid-item">
         <div className="field_label">Address</div>
         <input className="userdata_fields" type="text" name="address" value={address} onChange={(e) => handleChange(e)} required />
     </div>

     <div className="grid-item">
         <div className="field_label">Country</div>
         <input className="userdata_fields" type="text" name="country" value={country} onChange={(e) => handleChange(e)} required />
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