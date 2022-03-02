import './App.css';
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { UserContext } from './UserContext';
import Home from './components/home/Home';
import Chat from './components/chat/Chat';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
    <div className="App">
    <UserContext.Provider value={{user,setUser}}>
      <Routes >
         <Route exact path="/" element={<Home/>}/>
         <Route path="/chat" element={<Chat/>}/>
      </Routes >
    </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
