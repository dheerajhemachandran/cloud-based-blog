import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Updatepost from './pages/Updatepost';

function App() {
  const [id, setid] = useState()
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Feed setid={setid}/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/post' element={<Posts setid={setid}/>}/>
        <Route path="/update" element={<Updatepost id={id}/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
