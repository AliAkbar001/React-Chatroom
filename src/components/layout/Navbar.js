import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'

const Navbar = () => {
  const {user, setUser} = useContext(UserContext)

  const logout = async () => {
  try {
      const res = await fetch('http://localhost:4000/logout',{
      credentials:'include'
      })
      const data = res.json()
      console.log('Logout---', data)
      setUser(null)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <nav className='green'>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Chatroom</a>
      {user ? <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li onClick={logout}><a href="#">Logout</a></li>
      </ul>:
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>}
      
    </div>
  </nav>
  )
}

export default Navbar