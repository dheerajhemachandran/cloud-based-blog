import React from 'react'
import { auth,provider } from '../firebase/Firebase.config'
import { signInWithPopup,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  let navigate=useNavigate()

  const handlesubmit=(e)=>{
    e.preventDefault()
    const email=(e.target.email.value)
    const password=(e.target.password.value)

    signInWithEmailAndPassword(auth,email, password).then(function(user) {
      
      navigate("/feed")
      }).catch(function(error) {
       });
        localStorage.setItem("isauth",true)
  }

  const signInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result)=>{
        localStorage.setItem("isauth",true)
        navigate("/feed")
    })
  }



  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <form className='my-5 py-5 d-flex flex-column' onSubmit={handlesubmit}>
        <div className="mb-3 fw-bold fs-3 text-center text-primary">Log-in</div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">email</label>
          <input type="text" name="email" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control"/>
        </div>
        
        <button type="submit" className="btn btn-primary">login</button>
        <div className="my-2 text-center">or</div>
        <button className='btn btn-primary' onClick={signInWithGoogle}>Log in with google</button>
    
      </form>
      </div>
  )
}

export default Login
