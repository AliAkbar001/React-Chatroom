import './App.css';
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { UserContext } from './UserContext';
import Home from './components/home/Home';
import Chat from './components/chat/Chat';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, setUser] = useState(null);
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
