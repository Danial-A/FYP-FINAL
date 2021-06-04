import axios from 'axios'
import {Modal, Button } from 'react-bootstrap'
import React,{useState,useEffect,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import './ChatOnline.css'


const socket = io.connect("http://localhost:8080")

function ChatOnline({current, onlineUsers , setCurrentChat}) {
    const[friends, setFriends] = useState([])
    const [onlineFriends , setOnlineFriends] = useState([])


    

    //call functions
    const [me, setMe] =useState('')
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller,setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState('')
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(()=>{
      navigator.mediaDevices.getUserMedia({video:true, audio:true})
      .then(stream=> {
        setStream(stream)
        myVideo.current.srcObject = stream
      })
      
      socket.on('me',(id)=>{
        setMe(id)
      })

      socket.on('callUser', (data)=>{
        setReceivingCall(true)
        setCaller(data.from)
        setName(data.name)
        setCallerSignal(data.signal)
      })


    },[])


    const callUser = (id)=>{
        const peer = new Peer({
          initiator:true,
          trickle:false,
          stream:stream
        })

        peer.on("signal", (data)=>{
          socket.emit("callUser", {
            userToCall:id,
            signalData:data,
            from:me,
            name:name
          })
        })

        peer.on("stream", (stream)=>{
          userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal)=>{
          setCallAccepted(true)
          peer.signal(signal)
        })

        connectionRef.current = peer

    }

    const answerCall = ()=>{
      setCallAccepted(true)
      const peer = new Peer({
        initiator:false,
        trickle:false,
        stream:stream
      })

      peer.on("signal", (data)=>{
        socket.emit("answerCall", {
          signal:data,
          to:caller
        })
      })

      peer.on('stream', (stream)=>{
        userVideo.current.srcObject = stream
      })

      peer.signal(callerSignal)
      connectionRef.current = peer

    }

    const leaveCall = ()=>{
      setCallEnded(true)
      connectionRef.current.destroy()
    }

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
          </div>
          )
        )}
        </div>
       
        </div>
        
    )
}

export default ChatOnline
