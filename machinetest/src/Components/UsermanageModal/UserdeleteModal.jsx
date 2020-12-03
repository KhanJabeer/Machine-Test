import React from "react";
import './UsermanageModal.css'



const UserdeleteModal = ({ onClose,userId,users,loadUserDetails }) => {

  const deleteUser = () => {
      const filteredUsers = users && users.filter(user => user.userId !== userId)
      localStorage.setItem("users",JSON.stringify(filteredUsers))
      loadUserDetails();
      onClose()
  }

  return(
    <div className="delete_modal">
     
     <div className="delmodal_title">DELETE USER</div>
     <div className="divider"/>
     
         <div className="del_content">
        Are You Sure Want to Delete This User?
        </div>


         <div className="btn_wraps">
        <button className="cancel_btn" onClick={() => onClose()}>No</button>    
        <button className="addedit_btn" onClick={() => deleteUser()}>Yes</button>
    </div>     
    

    

    

    </div>
  )
  }


export default UserdeleteModal;