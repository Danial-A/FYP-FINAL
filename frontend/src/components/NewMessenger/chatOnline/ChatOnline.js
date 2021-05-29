import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import './ChatOnline.css'
function ChatOnline({current, onlineUsers , setCurrentChat}) {
    const[friends, setFriends] = useState([])
    const [onlineFriends , setOnlineFriends] = useState([])

    useEffect(()=>{
        const getFriends = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8080/users/${current}/getall`)
                const followers = res.data.followers
                const ids = followers.map(f => f._id)
                const friends_merged = [...followers,... res.data.following.filter(f=> !ids.includes(f._id))]
                setFriends(friends_merged)
            }catch(err){
                console.log(err)
            }
        }
        getFriends()
    },[current])
    
    useEffect(()=>{
      setOnlineFriends(friends.filter(f=> onlineUsers.includes(f._id.toString())))
    },[friends,onlineUsers])
    
    const handleClick = async (user) =>{
      try{
        const res = await axios.get(`http://localhost:8080/chats/${current}/chat/${user._id}`)
        setCurrentChat(res.data)
      }catch(err){
        console.log(err)
      }
    }
    return (
        <div className = "chatIconNameWrapper">
        <div className="chatOnline">
        {onlineFriends.map(
          user=>(
            <div className = "onlineWrapper">
            <div className="chatOnlineFriend" onClick = {()=>{handleClick(user)}}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src="/images/Dp.svg"
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{user.firstname} {user.lastname}</span>
          </div>
          <div className="callFriendIconWrapper">
            <button className = "btn btn-danger call-btn mt-3">Call <FontAwesomeIcon icon ={faPhone}/></button>
          </div>
          </div>
          )
        )}
        </div>
        </div>
    )
}

export default ChatOnline
