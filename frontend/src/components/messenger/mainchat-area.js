import React,{useState, useEffect} from 'react'
import Message from './message'
import axios from 'axios'
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './messenger.css'

function MainChatArea({chatid}) {
    // const socket = io('http://localhost:8080')
    // socket.on('connection', ()=>{
    //     console.log('I am connected to the backend')
    // })
   
    const [message,setMessage] = useState([])
    const [content,setContent] = useState('')
    
    useEffect(()=>{
        axios.get(`http://localhost:8080/chats/${chatid}/message/`)
        .then(response=> setMessage(response.data))
        .catch(err=> console.log(err))
    },[])

    const sendMessage = () =>{
        const sender = localStorage.getItem('userid')
        const roomid = chatid
        axios.post(`http://localhost:8080/chats/${chatid}/message/new`, {sender,roomid,content})
        .then(response=>{
            console.log(response)
        }).catch(err=>{
            console.log(err)
        })
    }
   
    return (
        <div className = "main-chat-area">
        <div className="title">
            <h3>Messenger</h3>
        </div>
        <div className="chat-messages">
            <div className="container-fluid message-area ">
             
                {message.length > 0 ? (
                    message.map(m=>(
                        <Message message = {m}/>
                    ))
                ) : <div>No messages yet</div> }
            </div>
            <div className=" container-fluid send-message">
            <div class="input-group mb-3">
            <input type="text"
             class="form-control  send-message-input" 
             placeholder="Type your message ....." 
             aria-label="Recipient's username" 
             aria-describedby="basic-addon2"
             value = {content}

             onChange = {e=> setContent(e.target.value)}
             />
            <div class="input-group-append">
              <button className = "btn btn-danger" type = "submit" onClick = { (e)=> {
                  e.preventDefault()
                    sendMessage()
            }}>Send </button>
            </div>
          </div>
        </div>
            
        </div>
        </div>
    )
}

export default MainChatArea
