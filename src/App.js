import './App.css';
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { UserContext } from './UserContext';
import Home from './components/home/Home';
import Chat from './components/chat/Chat';
import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try{
      const verifyUser = async () => {
        const res = await fetch('http://localhost:4000/verifyuser',{
        credentials:'include',
        headers:{'Content-Type':'application/json'}
        })
        const data = await res.json()
        setUser(data)
      }
      verifyUser()
    }catch(error){
      console.log(error)
    }
  }, [])
  
  return (
    <Router>
    <div className="App">
    <UserContext.Provider value={{user,setUser}}>
      <Navbar/>
      <Routes >
         <Route exact path="/" element={<Home/>}/>
         <Route path="/chat/:room_id/:room_name" element={<Chat/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
      </Routes >
    </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
