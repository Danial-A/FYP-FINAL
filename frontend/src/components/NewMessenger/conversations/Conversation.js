import axios from 'axios'
import React, {useState,useEffect} from 'react'
import './conversation.css'
function Conversation({conversation, current}) {
  const [img,setImg] = useState('')
  const [user,setUser] = useState(null)
  useEffect(() => {
    const friendid = conversation?.participants.find(m => m.toString() !== current?._id )
    const getUser = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/users/${friendid}`)
        setUser(response.data)
        if(response.data.profileImage !== ''){
          setImg(`http://localhost:8080/${response.data.profileImage}`)
        }
        
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  }, [current, conversation])
    return (
        <div className = "conversation">
        <img
          className="conversationImg"
          src= {img === 'http://localhost:8080/' ? "/images/Dp.svg" : img}
        />
        <span className="conversationName">{user?.firstname} {user?.lastname}</span>
        </div>
    )
}

export default Conversation
