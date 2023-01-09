import React from 'react'
import { auth,provider } from '../firebase/Firebase.config'
import { signInWithPopup ,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const handlesubmit=(e)=>{
    e.preventDefault()

    const name=(e.target.username.value)
    const email=(e.target.email.value)
    const password=(e.target.password.value)

    createUserWithEmailAndPassword(auth,email, password).then(function(user) {
      updateProfile(auth.currentUser,{ displayName: name }).then(function() {
        
        }).catch(function(error) {
       });
        localStorage.setItem("isauth",true)
        navigate("/feed")
    }).catch(function(error) {
      });
    
  }

  let navigate=useNavigate()

  const signInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result)=>{
        
        localStorage.setItem("isauth",true)
        navigate("/feed")
    })}

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <form className='my-5 py-5 d-flex flex-column' onSubmit={handlesubmit}>
        <div className="mb-3 fw-bold fs-3 text-center text-primary">Register</div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User Name</label>
          <input type="name" name="username" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control"/>
        </div>
        
        <button type="submit" className="btn btn-primary">signup</button>
        <div className="my-2 text-center">or</div>
        <button className='btn btn-primary' onClick={signInWithGoogle}>signup with google</button>
    
      </form>
      
    </div>
  )
}

export default Signup
