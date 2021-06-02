import React from 'react'
import axios from 'axios'
import './userSearch.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import {toast } from 'react-toastify'
function UserSearchBox(props) {
    toast.configure()
    const follower = (message) =>{
        toast.warning(message,{
                    position:"top-center",
                    autoClose:3000,
                    hideProgressBar:true,
                    pauseOnHover:true,
                    closeOnClick:true
        })
      }

      const notFollower = (message) =>{
        toast.success(message,{
                    position:"top-center",
                    autoClose:3000,
                    hideProgressBar:true,
                    pauseOnHover:true,
                    closeOnClick:true
        })
      }
    const uid = localStorage.getItem('userid')
    const followUser =async (userid) =>{
        console.log(userid, " ", uid)
        await axios.post(`http://localhost:8080/users/follower/${uid}`, {userid})
        .then(response=> {
          
            if(response.status === 201){
                follower(response.data)
            }
            else{
                notFollower(response.data)
            }
        })
        .catch(err=> console.log(err))
    }
    return (
        <div className = "user-box">
            <Link><FontAwesomeIcon icon = {faUser} className = "user-icon"/>{`${props.user.firstname} ${props.user.lastname} (${props.user.username})`}</Link>
            { localStorage.getItem('userid') === props.user._id ? 
            <button className = "btn btn-outline-danger">You</button> : 
            <button className = "btn btn-danger" onClick = {()=>{
                followUser(props.user._id)
            }}>Follow User</button>
        }
        </div>
    )
}

export default UserSearchBox
