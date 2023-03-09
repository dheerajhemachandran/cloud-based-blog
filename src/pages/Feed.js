import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDatabase,ref,onValue } from 'firebase/database'
import Post from '../components/Post'

const Feed = ({setid}) => {
  const [data, setdata] = useState([])

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'posts/');
    onValue(dbRef, (snapshot) => {
      setdata([])
    snapshot.forEach((childSnapshot) => {
      const childKey=childSnapshot.key;
      const childData = childSnapshot.val();
      setdata(data=>[...data,{data:childData,key:childKey}])
    });
  });
  
  }, [])

 
  return (
  <div className='d-flex justify-content-center align-items-center py-5'>
  {localStorage.getItem("isauth")?  
  <div className='d-flex justify-content-cente flex-column gap-5 align-items-center py-5'>
    <div className='display-5 fw-bold'>welcome <span className='text-primary'>"{localStorage.getItem("isauth")}"</span></div>
    {data.map((post,index)=>{return(<Post setid={setid} post={post} key={index}/>)})}
  </div>
  :
  <Link to="/login">please sign in to view content</Link>}
  </div>
  )
}

export default Feed
