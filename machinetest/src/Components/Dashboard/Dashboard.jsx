import React,{useEffect,useState} from "react";
import './Dashboard.css'
import Pagination,{PaginationHelper} from '../Pagination/Pagination';
import Logout from '../Login/Logout'


const Dashboard = ({ loggedInUser,history }) => {


  const [userDetails,setUserDetails] = useState([])

  const [currId,setCurrId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [paginationIndex,updatePaginationIndex] =useState(0);
  const [entersearch,setSearch] =useState("");
  
  useEffect(() => {
    loadUserDetails()
},[])


// Search users
useEffect(() => {
  const results = !entersearch || entersearch.trim() === "" ? JSON.parse(localStorage.getItem("users")) : userDetails && userDetails.filter((data) => {
     if (data.name !== null && data.name.toLowerCase().includes(entersearch.toLowerCase()) ||
        (data.status != null && data.status.toLowerCase().includes(entersearch.toLowerCase()))  ||
        (data.country != null && data.country.toLowerCase().includes(entersearch.toLowerCase()))
    ) {
      return data
    }
   
  })
  
  setUserDetails(results)
},[entersearch])

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

const searchUser = (e) => {
   setSearch(e.target.value)
}


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userDetails && userDetails.filter((user)=>user.role === "user" && user.userId !== currId).slice
  (indexOfFirstPost, indexOfLastPost);

  // Change page
  const setpaginate = (pageNumber,click_data) => {

    var gethelperData=PaginationHelper.checkingPaginationProcess(pageNumber,click_data,null,userDetails,postsPerPage,currentPage);
    if(gethelperData.pageNumber){
      setCurrentPage(gethelperData.pageNumber);
    }
    if(gethelperData.totalmovedpage>=0){
      updatePaginationIndex(gethelperData.totalmovedpage);
    }

  }

  const updatePaginationData=(data,totalnumbers)=>{

    updatePaginationIndex(data);
    var gethelperData=PaginationHelper.checkingPaginationProcess((data*5)+1,null,totalnumbers,userDetails,postsPerPage,currentPage);
    if(gethelperData.pageNumber){
      setCurrentPage(gethelperData.pageNumber);
    }

  }

   return(
    <div>      
     
           <Logout history={history} loggedInUser={loggedInUser}/>
          
    

     
           <div className="dash_content">

          <div className="search_wrap">
            <div className="search_label">Search User</div>
          <input className="search_field" 
          type="search"  value={entersearch}  onChange={(e)=>searchUser(e)}/>
          </div>
         

           <div className="userstatus_header">
             <div>User List</div>
             <div>Country</div>
             <div>Status</div>
             </div>
            {currentPosts && currentPosts.length > 0 && currentPosts.map((user) => {
              return(
                 <div className="users"><div className="user_names">{user.name}</div>
                  <div className="status">{user.country}</div>
                 <div className="status">{user.status}</div></div>
              )
            })}
           </div>

           <Pagination
            postsPerPage={postsPerPage}
            totalPosts={userDetails && userDetails.length}
            paginationIndex={paginationIndex}
            udpatePageNumber={(i)=>setCurrentPage(i)}
            paginate={(data)=>setpaginate(data,'click')}
            updatePaginationIndex={(data,totalnumbers)=>updatePaginationData(data,totalnumbers)}
            pageNo={currentPage && currentPage}
            />

    </div>
  )
  }


export default Dashboard;