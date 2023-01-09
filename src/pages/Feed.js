import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/Firebase.config'
const Feed = () => {
  return (
  <div className='d-flex justify-content-center align-items-center py-5'>
  {auth.currentUser?  
  <div>welcome {auth.currentUser.displayName}</div>:
<Link to="/">please sign in to view content</Link>}
  </div>
  )
}

export default Feed
