import React from 'react'
import './messenger.css'
function Message({message}) {
    return (
        <div key = {message._id} className="message-container">
        <small>{message.sender}: </small>
            <div className = "message-box">
                {message.content}
            </div>
        </div>
        
    )
}

export default Message
