import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom'
import RoomList from './RoomList'
import io from 'socket.io-client'

let socket;
const Home = () => {
  const {user, setUser} = useContext(UserContext)
  const [room, setRoom] = useState('')
  const EndPoint = 'localhost:4000'

  useEffect(()=>{
    socket  = io(EndPoint)
    return ()=>{
      socket.emit('disconnect')
      socket.off();
    }
  },[EndPoint])

  const rooms = [{
    name: 'room1',
    _id: '1'
  },{
    name: 'room2',
    _id: '2'
  }]
  const handleSubmit = e => {
    e.preventDefault()
    socket.emit('create-room', room)
    console.log(room)
    setRoom('')
  }
  const setAsAli = () =>{
    const ali = {
      name : 'Ali',
      email : 'ali@gmail.com',
      password : 'ali123',
      id : '1' 
    }
    setUser(ali)
  }
  const setAsAhmed = () =>{
    const ahmed = {
      name : 'Ahmed',
      email : 'ahmed@gmail.com',
      password : 'ahmed123',
      id : '2' 
    }
    setUser(ahmed)
  }
  return (
    <div className="row">
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title"> Welcome { user ? user.name : '' }</span>
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input 
                    placeholder="Enter Room Name" 
                    id="room" 
                    type="text" 
                    className="validate"
                    value={room}
                    onChange={e=>setRoom(e.target.value)}
                    />
                  <label htmlFor="room">Room</label>
                </div>
              </div>
              <button className='btn'>Create Room</button>
            </form>
        </div>
        </div>
        <div className="card-action">
          <a href="#" onClick={setAsAli}>Set as Ali</a>
          <a href="#" onClick={setAsAhmed}>Set as Ahmed</a>
        </div>
      </div>
    </div>
    <RoomList rooms = {rooms}/>
    <Link to={'./chat'}>
      <button className='btn'>Chat Room</button>
    </Link>
  </div>
            
  )
}

export default Home