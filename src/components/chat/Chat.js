import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import  MessageBox  from './MessageBox';
import { UserContext } from '../../UserContext';

let socket;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');
  const{user, setUser} = useContext(UserContext)
  let {room_id, room_name} = useParams();
  const EndPoint = 'localhost:4000'

  useEffect(() => {
    socket = io(EndPoint)
    socket.emit('join', {name:user.name, room_id, user_id:user.id})
  }, [])

  useEffect(()=>{
      socket.on('message', message=>{
         setMessages([...messages,message ])
      })
  },[messages])

  useEffect(() => {
    socket.emit('get-messages-history', room_id)
    socket.on('output-messages', messages => {
        setMessages(messages)
    })
}, [])

  const handleMessage = e =>{
    e.preventDefault()
    if(message){
      socket.emit('sendMessage',message,room_id,()=>setMessage('')) 
    }
  }

  return (
    <div>
      <h5>Room ID: {room_id}</h5>
      <h5>Room Name: {room_name}</h5>
      <br/>
      <MessageBox messages={messages} user_id={user.id}/>
      <form action='' onSubmit={handleMessage}>
        <input
          type='text'
          value={message}
          onChange={e=>setMessage(e.target.value)}
          onKeyPress={e=>e.key==='Enter'?handleMessage(e):null}
        />
      </form>
    </div>
  )
}

export default Chat