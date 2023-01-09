import React from 'react'
import { auth } from '../firebase/Firebase.config'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='flex justify-center items-center'>
    {auth.currentUser?  
    <div>welcome {auth.currentUser.displayName}</div>:
  <Link to="/">please sign in to view content</Link>}
    </div>
  )
}

export default Profile
