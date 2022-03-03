import React from 'react'

function Room(props) {
  return (
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Room