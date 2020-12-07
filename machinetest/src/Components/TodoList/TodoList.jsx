import React, { useState, useEffect } from 'react';
import  './TodoList.css';
import Pagination,{PaginationHelper} from '../Pagination/Pagination';
import Logout from '../Login/Logout'


const TodoList = ({history}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [hasError, setErrors] = useState(false);
  const [paginationIndex,updatePaginationIndex] =useState(0);
  const [userDetails,setUserDetails] = useState([]);
  const [loggedInUser,setLoggedInUser] = useState(null)


  useEffect(() => {

    const fetchTodo = async () => {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      res.json()
      .then(res => setPosts(res))     
      .catch(err => setErrors(err)); 
      setLoading(false); 
    };

    fetchTodo();
    loadUserDetails();
  }, []);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const setpaginate = (pageNumber,click_data) => {

    var gethelperData=PaginationHelper.checkingPaginationProcess(pageNumber,click_data,null,posts,postsPerPage,currentPage);
    if(gethelperData.pageNumber){
      setCurrentPage(gethelperData.pageNumber);
    }
    if(gethelperData.totalmovedpage>=0){
      updatePaginationIndex(gethelperData.totalmovedpage);
    }

  }

  const loadUserDetails = () => {
   
    if(localStorage.users) {
      const user = JSON.parse(localStorage.getItem("users"))
      setUserDetails(user)
    }

    if(localStorage.loggedInUser) {
      const user = JSON.parse(localStorage.getItem("loggedInUser"))
      setLoggedInUser(user)
     
    }
  }

  const updatePaginationData=(data,totalnumbers)=>{
    updatePaginationIndex(data);
    var gethelperData=PaginationHelper.checkingPaginationProcess((data*5)+1,null,totalnumbers,posts,postsPerPage,currentPage);
    if(gethelperData.pageNumber){
      setCurrentPage(gethelperData.pageNumber);
    }
  }

  

  return (
    
    <div className='container mt-5'>
   
        <Logout history={history} loggedInUser={loggedInUser}/>
        <div className="todolist_content">
       
        <table className="table_style">
   
            <tr>
                <th>To Do Task</th>
                <th>Status</th>              
            </tr>
            {loading === true ? <div className="load_class"><h4>Loading...</h4></div> :  
            currentPosts && currentPosts.map(currentPosts => (
            
           <tr>           
                <td>{currentPosts.title}</td>
                <td>{currentPosts.completed === true ? "Completed" : "Pending" }</td>      
            </tr>
            ))} 
    </table>

    </div>
    
   
   
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts && posts.length}
        paginate={(data)=>setpaginate(data,'click')}
        paginationIndex={paginationIndex}
        updatePaginationIndex={(data,totalnumbers)=>updatePaginationData(data,totalnumbers)}
        udpatePageNumber={(i)=>setCurrentPage(i)}
        pageNo={currentPage && currentPage}
      />
    </div>
  );
};

export default TodoList;