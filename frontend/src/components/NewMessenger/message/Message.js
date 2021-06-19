import React, {useState,useEffect} from 'react'
import moment from 'moment'
import './message.css'
import axios from 'axios'

function Message({message,own}) {
  const [img,setImg] = useState('')
  useEffect(async()=>{
      try{
        const response = await axios.get(`http://localhost:8080/users/${message.sender}/profile/image`)
        if(response.data !== '' || response.data !== null){
          setImg(`http://localhost:8080/uploads/users/${message.sender}/${response.data}`)
          console.log(response.data)
        }
      }catch(err){
        console.log(err)
      }
  },[])
  console.log(img)
    return (
        <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={img === 'http://localhost:8080//images/Dp.svg' ? '/images/Dp.svg' : img}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
    )
}

export default Message
