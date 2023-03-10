import React from 'react'
import { auth } from '../firebase/Firebase.config'
import { Link } from 'react-router-dom'

const Profile = () => {
  console.log(auth.currentUser)
  return (
    <div className='d-flex justify-content-center align-items-center my-5'>
    {auth.currentUser?  
    <div>welcome {auth.currentUser.displayName}</div>:
  <Link to="/">please sign in to view content</Link>}
    </div>
  )
}

export default Profile
