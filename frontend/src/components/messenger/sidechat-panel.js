import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Conversation from '../conversations/conversation'
import 'bootstrap/dist/css/bootstrap.min.css'
import './messenger.css'
function ChatSidePanel() {
    const uid = localStorage.getItem('userid')
    const [chats,setChats] = useState([])
    //Users search
    const [users,setUsers] = useState([])
    const [filteredUsers,setFileteredUsers] = useState([])
    const [searchText , setSearchText] = useState('')

    useEffect(()=>{
        
        axios.get(`http://localhost:8080/chats/${uid}/chats`)
        .then(response=>{
            setChats(response.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    useEffect(() => {
      const getUsers =async ()=>{
        try{
            const response =await axios.get(`http://localhost:8080/users/${uid}/getall`)
            setUsers(response.data.following)
        }catch(err){
            console.log(err)
        }
      }
      getUsers()
    }, [])
    useEffect(()=>{
        if(users.length !== 0){
            const result = users.filter(u=> u.username.includes(searchText) && searchText !== '')
            setFileteredUsers(result)
        }
    },[searchText])
    const createChat =async (userid)=>{
        const recieverId = userid
        const senderId = localStorage.getItem('userid')
        await axios.post(`http://localhost:8080/chats/create`, {recieverId,senderId})
        .then(res=>console.log(res))
        .catch(err=> console.log(err))
    }
    return (
        <div className = "side-panel-main">
            <div className="title">
                <Link to = "/messenger"><h3>Chats</h3></Link>
            </div>
            <div className="chat-list mt-3">
                <ul>
                    {chats?.length > 0 ? (
                        chats.map(chat=>(
                            <Conversation conversation = {chat}/>
                        ))
                    ) : <div>No chats yet</div>
                }
                </ul>
            </div>
            <div className="create-new-chat">
            <h4 style = {{color:"#1c2237"}}>Create New Chat</h4>
            <div class="input-group mb-3">
            <input type="text"
            class="form-control" 
            placeholder="Enter username..." 
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            value = {searchText}
            onChange = {e=> setSearchText(e.target.value)}
            />
            
            
            
          </div>
          <div className="users">
                {filteredUsers.length > 0 ? filteredUsers.map(u=>(
                    <div className = "user-search-result">
                        <div>{`${u.firstname} ${u.lastname} (${u.username})`}</div>
                        <button className = "btn btn-danger" onClick = {()=>{
                            createChat(u._id)
                        }}>Create Chat</button>
                    </div>
                    )): <div>No users found</div>}
            </div>
            </div>
        </div>
    )
}

export default ChatSidePanel
