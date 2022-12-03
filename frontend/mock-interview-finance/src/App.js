import Home from './pages/Home/Home'

import Interview from './pages/Interview/Interview'
import Interviews from './pages/Interviews/Interviews'
import { useNavigate } from "react-router-dom";

import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
/*
If user id is not found, send user to /
*/
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false
  })
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null
  })
  let logOutBtn = null
  const setIsLoggedInState = (newIsLoggedIn) => {
    localStorage.setItem("isLoggedIn", newIsLoggedIn)
    setIsLoggedIn(newIsLoggedIn)
  }
  const setUserIdState = (newUserId) => {
    localStorage.setItem("userId", newUserId)
    setUserId(newUserId)
  }

  return (
    <Router>
      <NavBar n/>
    <Routes>
      <Route path='/' element={<Home 
      setIsLoggedInState={setIsLoggedInState} 
      setUserIdState={setUserIdState} 
      isLoggedIn={isLoggedIn} 
      userId={userId} />}/>
      <Route path='/Interview' element={<Interview isLoggedIn={isLoggedIn} userId={userId} />}/>
      <Route path='/Interviews' element={<Interviews isLoggedIn={isLoggedIn} userId={userId} />}/>
    </Routes>
    </Router>

  );

  function NavBar() {
    const navigate = useNavigate();
    if (isLoggedIn) {
      logOutBtn = (<span id="logoutBtn" onClick={() => {
        setIsLoggedInState(false)
        setUserIdState(null)
  
        navigate("/")
      }
      }>Log out</span>);
    }
    
    return (
      <nav>
      <span>mockinterview.finance</span>
      {logOutBtn}
      </nav>
    )
  }
}



export default App;
