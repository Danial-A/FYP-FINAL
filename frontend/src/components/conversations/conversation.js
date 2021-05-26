import axios from 'axios'
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import './conversation.css'
function Conversation({conversation}) {
    const uid = localStorage.getItem('userid')
const [user,setUser] = useState(null)
useEffect(()=>{
    const friendId = conversation.participants.find(m => m.toString() !== uid)
    const getUser = async ()=>{
        const res = await axios.get(`http://localhost:8080/users/${friendId}`)
        setUser(res.data)
    }
    getUser()
},[])
console.log(user)
    return (
        <Link style= {{textDecoration:'none', color:"black"}} to = {`/messenger/${conversation._id}`}>
            <div className="conversation">
                <img className = 'conversationImg' src="/images/danial.jpg" alt="" />
                <span className="conversationName">{user?.firstname} {user?.lastname}</span>
            </div>
        </Link>
    )
}

export default Conversation
