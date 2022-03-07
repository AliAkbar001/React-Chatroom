import React from 'react'
import { Link } from 'react-router-dom'
import Room from './Room'

function RoomList({rooms}) {
  return (
    <div>
        {rooms && rooms.map((room,i) =>
        <Link key={i} to={'/chat/' + room._id + '/' + room.name}>
          <Room name = {room.name}/>
        </Link>
          )}
    </div>
  )
}

export default RoomList