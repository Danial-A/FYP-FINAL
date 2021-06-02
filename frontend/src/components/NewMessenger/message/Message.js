import React from 'react'
import moment from 'moment'
import './message.css'

function Message({message,own}) {
    return (
        <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="/images/Dp.svg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
    )
}

export default Message
