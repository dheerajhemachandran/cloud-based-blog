import React from 'react'
import {Link} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import {useNavigate} from "react-router-dom"
import { auth } from '../firebase/Firebase.config'

const Navbar = () => {

  const navigate=useNavigate();

  const signout=()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      navigate("/login")
    })

  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-lg-5 px-3 py-2">
  <div className="container-fluid px-lg-5 mx-lg-5">
    <div className="navbar-brand"> welcome {localStorage.getItem("isauth")}</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto me-4 gap-3">
        
        {localStorage.getItem("isauth")?
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="dropdown nav-item">
          <button className="dropdown-toggle btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {localStorage.getItem("isauth")}
          </button>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
          <li><Link className="dropdown-item" to="/post">My Posts</Link></li>
          <li><button className="dropdown-item" onClick={signout}>Logout</button></li>
        </ul>
      </li>
       
        </>:
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Log-in</Link>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar
