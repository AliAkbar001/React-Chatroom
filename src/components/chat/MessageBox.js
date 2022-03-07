import React from 'react'

function MessageBox({messages,user_id}) {
  return (
    <div style={{padding:"20px"}}>
      {console.log(messages)}
        {messages !== "" && messages.map((message, i)=>(
            <div key={message._id}>
              {message.user_id === user_id ?
              <h4 style={{color: "green",textAlign:"left",borderBottom:"2px solid black"}}>
                {message.text}
                <span style={{color: "gray",fontSize:"15px",textAlign:"right"}}>  --YOU--{message.updatedAt}</span>
                </h4>:
              <h4 style={{color: "blue",textAlign:"right"}}>
                <span style={{color: "gray",fontSize:"15px"}}>{message.name}--{message.updatedAt}--  </span>
                {message.text}</h4>}
            </div>
        ))}
    </div>
  )
}

export default MessageBox