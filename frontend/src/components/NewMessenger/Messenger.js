import React, {useState,useEffect, useRef} from 'react'
import NavigationBar from '../navigation-bar/userNavbar'
import ChatOnline from './chatOnline/ChatOnline'
import Conversation from './conversations/Conversation'
import Message from './message/Message'
import axios from 'axios'
import {io} from 'socket.io-client'
import {toast } from 'react-toastify'
import './newMessenger.css'

function NewMessenger() {

    toast.configure()
    const NewChat = (message) =>{
        toast.success(message, {
            position:"top-center",
            autoClose:2000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
}

    const userid = localStorage.getItem('userid')
    const [user,setUser] = useState(null)
    const [conversations,setConversations ] = useState([])
    const [currentChat,setCurrentChat ] = useState(null)
    const [messages,setMessages ] = useState([])
    const [arrivalMessage,setArrivalMessage ] = useState(null)
    const [newMessage,setNewMessage ] = useState("")
    const [onlineUsers,setOnlineUsers ] = useState([])
    const socket = useRef()
    const scrollRef = useRef()

    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    //Filter user search results
    useEffect(()=>{
        if(users.length !== 0){
            const result = users.filter(u=> (u.username.includes(searchText) || u.firstname.includes(searchText)) && searchText !== '' )
            setFilteredUsers(result)
          
        }
    },[searchText])

    //create new chat
    const createChat = async (uid) =>{
        try{
            const response = await axios.post(`http://localhost:8080/chats/create`, {senderId:userid, recieverId: uid})
            NewChat(response.data.message)
            setConversations([...conversations, response.data.chat])
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        socket.current = io("ws://localhost:8080")
        socket.current.on('getMessage', data=>{
            setArrivalMessage({
                sender: data.senderId,
                text:data.text,
                createdAt: Date.now()
            })
        })
    },[])
    
    useEffect(() => {
        arrivalMessage && currentChat?.participants.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit('addUser',userid)
        socket.current.on('getUsers', users=>{
            setOnlineUsers(users.map(u=> u.userId))
        })
    }, [])
  
    useEffect(() => {
      const getConversations = async ()=>{
          try{
            const res = await axios.get(`http://localhost:8080/chats/${userid}/chats/`)
            setConversations(res.data)
          }catch(err){
            console.log(err)
          }
      }
      getConversations()
    }, [user?._id])



   useEffect(() => {
    const getUser =async () =>{
        try{
            const res = await axios.get(`http://localhost:8080/users/${userid}`)
            const all = [ ...res.data.followers, ...res.data.following]
            const unique = Array.from(new Set(all.map(a=> a._id))).map(id => {
                return all.find(a=> a._id === id)
            })
            setUsers(unique)
            setUser(res.data)
            // //filter the participants of conversations
            // const participants = conversations.map(c => [...c.participants])
            // const merged =await participants.flat(1)
            // const final =await [... new Set(merged)] 
            // console.log(final)
            // setUser(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getUser()
   }, [])


   //get messages
   useEffect(()=>{
    const getMessages = async () =>{
        try{          
            const res = await axios.get(`http://localhost:8080/chats/${currentChat?._id}/`)
            setMessages(res.data.messages)
        }catch(err){
            console.log(err)
        }
    }
    getMessages()
   },[currentChat])
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const message = {
        sender: user._id,
        text: newMessage
    }
    const recieverId = currentChat.participants.find(m => m.toString !== userid)

    socket.current.emit('sendMessage', {
        senderId:userid,
        recieverId,
        text: newMessage
    })
    try{
        const res = await axios.post(`http://localhost:8080/chats/${currentChat?._id}/message/new`, message)
        setMessages([...messages, res.data.message])
        setNewMessage('')
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
    return (
        <>
        <NavigationBar/>
        <div className = "messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder = "Search for friends" className="chatMenuInput" 
                        value = {searchText}
                        onChange = {e => setSearchText(e.target.value)}
                    />
                    <div className="users-container">
                        {
                            filteredUsers.length > 0 ? filteredUsers.map(u => (
                                <div className = "conversation" style = {{backgroundColor:"#cad3de", display :"flex", justifyContent:"space-between"}}>
                                <div>
                                <img
                                  className="conversationImg"
                                  src= "/images/Dp.svg"
                                />
                                <span className="conversationName">{u.firstname} {u.lastname}</span></div>
                                <button className = "btn btn-danger" onClick = {()=> createChat(u._id)}>Create Chat?</button>
                                </div>
                            )) : searchText === '' ? <div className = "no-search-text">Enter search text</div>  : <div className = "no-search-text">No users found</div> 
                        }
                    </div>
                    {
                        conversations.map(c=>(
                            <div onClick = {() => setCurrentChat(c)}>
                                <Conversation conversation = {c} current = {user}/>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                {
                    currentChat ? 
                <>
                    <div className="chatBoxTop">
                        {
                            messages.map(m=>(
                                <div ref = {scrollRef}>
                                <Message message = {m} own = {m.sender.toString() === userid}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder = "Write Something...." className = "chatMessageInput" onChange = {(e)=> setNewMessage(e.target.value)}
                        value = {newMessage}></textarea>
                        <button className = "chatSubmitButton" onClick = {(e)=> handleSubmit(e)}>Send</button>
                    </div>
                    </> : <span className = "noConversationText">Open a conversation to start a chat</span>
                }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                <h3>Online Friends</h3>
                    <ChatOnline onlineUsers = {onlineUsers} current = {userid} setCurrentChat= {setCurrentChat}/>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default NewMessenger
