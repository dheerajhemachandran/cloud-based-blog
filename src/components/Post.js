import React from 'react'
import { getDatabase,ref,remove } from 'firebase/database';
import { useLocation,Link } from 'react-router-dom';

const Post = ({post,setid}) => {
    const loc=useLocation()
    const path=loc.pathname;
    function deletenode(){
        const db = getDatabase();
        remove(ref(db, 'posts/'+post.key))
       
    }
  return (
    <div class="card mb-5" style={{width:"80vw"}}>
    <div class="card-body">
      <h5 class="card-title">{post.data.title}</h5>
      {path==="/"?<p>author:<span className='text-primary'>{post.data.aname}</span></p>:<></>}
      <p class="card-text mt-3">{post.data.content}</p>
      {localStorage.getItem("isauth")===post.data.aname?<Link to="/update" onClick={()=>setid(post)} className="btn btn-primary me-3">update</Link>:<></>}
      {localStorage.getItem("isauth")===post.data.aname?<button onClick={deletenode} className="btn btn-danger">delete</button>:<></>}
    </div>
  </div>
  )
}

export default Post