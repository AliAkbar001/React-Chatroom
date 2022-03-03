import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import { UserContext } from '../../UserContext';

let socket;

const Chat = () => {
  const{user, setUser} = useContext(UserContext)
  let {room_id, room_name} = useParams();
  const EndPoint = 'localhost:4000'

  useEffect(() => {
    socket = io(EndPoint)
    socket.emit('join', {name:user.name, room_id, user_id:user.id})
  }, [])
  
  return (
    <div>
      <h1>{room_id}</h1>
      <h1>{room_name}</h1>
    </div>
  )
}

export default Chat