import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './messenger.css'
function Message({message}) {
    const [user, setUser] = useState(null)
    useEffect(() => {
       const getUser = async ()=>{
           const res = await axios.get(`http://localhost:8080/users/${message.sender}`)
           setUser(res.data)
       }
       getUser()
    },[])
    return (
        <div key = {message._id} className="message-container">
        <div className={message.sender === localStorage.getItem('userid') ? null : 'float-element'}>
        <small style = {{fontSize:'18px', fontFamily:"cursive"} }>{message.sender === localStorage.getItem('userid') ? "You" : user?.firstname}: </small>
            <div className = "message-box">
                {message.text}
            </div>
        </div>
        </div>
        
    )
}

export default Message
