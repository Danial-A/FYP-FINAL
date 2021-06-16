import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios'
import NavigationBar from '../navigation-bar/userNavbar'
import Footer from '../footer-section/footer'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from '../post-component/post'
import './groupsDisplayHome.css'
import MemberCard from './memberCard'
import Message from '../NewMessenger/message/Message'
import AddUserCard from './AddUserCard'
import './membercard.css'
import {io} from 'socket.io-client'

function GroupPage({match}) {
    const userid = localStorage.getItem('userid')
    const gid = match.params.id
    const [group, setGroup] = useState({})
    const [user,setUser] = useState({})
    const[userSearch, setUserSearch] = useState('')
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [groupMembers,setGroupMembers] = useState([])
    const [groupAdmins,setGroupAdmins] = useState([])
    const [TotalPosts, setTotalPosts] = useState([]);
    const [posts,setPosts] = useState([])
    const [chatid, setChatid] = useState('')
    const [chat, setChat] = useState({})
    const socket = useRef()
    const [arrivalMessage,setArrivalMessage ] = useState(null)
    const [messages,setMessages ] = useState([])
    const [newMessage, setNewMessage] = useState('')
    

    useEffect(()=>{
        axios.get(`http://localhost:8080/groups/${gid}/`)
        .then(response=>{
            setGroup(response.data)
            setPosts(response.data.posts)
            setGroupAdmins(response.data.admins)
            setGroupMembers(response.data.groupMembers)
            setChatid(response.data.chatid)

        }).catch(err=>{
            console.log(err)
        })

      
    })

    useEffect(()=>{
        axios.get(`http://localhost:8080/users/${userid}/`)
        .then(res=>{
            const usersAll = [...res.data.following,...res.data.followers]
            const unique =  Array.from(new Set(usersAll.map(a=> a._id))).map(id => {
                return usersAll.find(a=> a._id === id)
            })
            setUsers(unique)
            setUser(res.data)
        }).catch(err=>{
            console.log(err)
        })

        socket.current = io("ws://localhost:8080")
        socket.current.emit('createRoom', chatid)
        socket.current.on('getGroupMessage', data=>{
            setArrivalMessage({
                sender: data.senderId,
                text:data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(async()=>{
        try{
         const res =await  axios.get(`http://localhost:8080/rooms/${chatid}/`)
         setMessages(res.data.messages)
         setChat(res.data)
        }catch(err){
            console.log(err)
        }
     })
    

    useEffect(() => {
        arrivalMessage && chat?.participants.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage,chat])

    useEffect(()=>{
        if(users.length !== 0){
            const result = users.filter(u=> (u.username.includes(userSearch) || u.firstname.includes(userSearch)) && userSearch !== '' )
            setFilteredUsers(result)
        }
    },[userSearch])
    
   

    //form validation
    const initialValues = {
        title: '',
        body: '',
        author: localStorage.getItem('userid'),
        postType: 'group'
    }

    const onSubmit = async (values,onSubmitProps) =>{
        try{
            const res = await axios.post(`http://localhost:8080/groups/${gid}/posts/create`, values)
            setTotalPosts([...TotalPosts, res.data.post])
            onSubmitProps.resetForm()
        }catch(err){
            console.log("Error:", err)
        }
    }



    const validationSchema = Yup.object({
        title: Yup.string().required('This field is required..'),
        body: Yup.string().required('This field is required..')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const handleSubmit =async (e) =>{
        e.preventDefault()
        const message = {
            sender: userid,
            text:newMessage,
            chatid
        }
        socket.current.emit('groupMessage', {
            senderId: userid,
            room: chatid,
            text:newMessage
        })
        try{
            const res = await axios.post(`http://localhost:8080/rooms/${chatid}/message/new`,message)
            setMessages([...messages],res.data.message)
            setNewMessage('')
        }catch(err){
            console.log(err)
        }
    }

    const checkAdmin = () =>{
        const found = groupAdmins.filter(g=> g.toString() === userid)
        if(found.length > 0){
            return true
        }else{
            return false
        } 
    }
    return (
        <div className = "container-fluid bottom-margin">
        <NavigationBar/>
            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="container group-info">
                        <h3>Group information</h3>
                        <h5>Title: {group?.title}</h5>
                        <h5>Description: <small>{group?.description}</small></h5>
                    </div>
                    <div className="container create-post mt-5">
                         <h3>Create post</h3>
                         <form onSubmit = {formik.handleSubmit}>
                         <div className="row">
                         <div className="col post-heading">
                             <label htmlFor="postheading">Post Heading:</label>
                             <input type="text" name="title" id="inputBackground" style = {{width: "100%"}}
                                 placeholder ="Enter the post title..."
                                 onChange = {formik.handleChange}
                                 onBlur = {formik.onBlur}
                                 value = {formik.values.title}
                             />
                             {formik.errors.title && formik.touched.title ? <div style = {{color: 'crimson'}}><p>{formik.errors.title}</p></div> : null}
                         </div>
                         </div>
                         <div className="row">
                         <div className="col">
                             <div className="post-body">
                                 <label htmlFor="body">Post Body: </label>
                                 <textarea name="body" id="inputBackground" rows="6" 
                                 placeholder = "Enter the post description...."
                                 onChange = {formik.handleChange}
                                 onBlur = {formik.onBlur}
                                 value = {formik.values.body}
                                 />
                                 {formik.errors.body && formik.touched.body ? <div style = {{color: 'crimson'}}><p>{formik.errors.body}</p></div> : null}
                             </div>
                             </div>
                         </div>
                         <div className="add-post-button">
                             <button type = "submit" className = "btn btn-danger mb-3">Add Post!</button>
                         </div>
                         </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container group-posts">
                        <h3 className="mb-4 ml-3 ">Group Posts</h3>
                        <Post posts = {posts}/>
                    </div>
                </div>
                <div className="col-md-3">
                <h5 style = {{color:"white"}}>Group Members</h5>
                    <div className="container members-section " style = {{overflowY:"scroll"}}>
                        
                        
                            {
                                groupMembers.map(
                                    u=>(
                                        groupMembers.length > 0 ? <MemberCard user = {u} groupid = {gid}/> : <li>No users</li>
                                    )
                                )
                            } 
                        {
                            checkAdmin ? <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search user.."
                                value = {userSearch}
                                onChange = {e=> setUserSearch(e.target.value)}
                            />
                          </div> : null
                        }
                          <div className="users-search">
                            {
                                filteredUsers.map(u => (
                                    filteredUsers.length > 0 ? <AddUserCard user  = {u} groupid = {gid}/> : <div>No users found</div>
                                ))
                            }
                          </div>
                    </div>
                    <div className="container admins mt-3">
                        <h5>Group Admins</h5>
                        {
                            groupAdmins.map(
                                u=>(
                                    groupAdmins.length > 0 ? <MemberCard user = {u}/> : <div>No users</div>
                                )
                            )
                        }
                            
                    </div>
                   <div className="groupChatWrapper">
                   <h5 style ={{textAlign:"center", color:"white"}} className = "mt-3">Group Chat</h5>
                   <div className="container group-chat mt-3">
                
                      <div className="messages">
                      {
                          messages?.map(
                              m=>(
                                  messages.length > 0 ? <Message message = {m} own = {m.sender.toString() === userid}/> : <div>No messages in chat</div>
                              )
                          )
                      }
                      </div>
                     
               </div>
               <div className="sendMessage">
               <div class="input-group mt-3 mb-1">
               <input type="text" class="form-control" placeholder="New Message.."
               value = {newMessage}
               onChange=  {e=> setNewMessage(e.target.value)}/>
               <div class="input-group-append">
                 <button className = "btn btn-danger" onClick = {(e)=> handleSubmit(e)}>Send</button>
               </div>
                </div>
               </div>
                   </div>
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default GroupPage
