import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
function RecommendedUserCard({user}) {
    toast.configure()
    const added = (message) =>{
        toast.success(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
    const userid = localStorage.getItem('userid')
    const followUser =async (id) =>{
        try{
            const response = await axios.post(`http://localhost:8080/users/follower/${userid}`, {userid:id})
            added(response.data)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className = "userCard">
            <div className = "user-box" style = {{display:"flex",justifyContent:"space-between"}}>
                <img src={user.profileImg ? user.profileImg : '/images/Dp.svg'} height = "50px" alt="" />
                <span style = {{fontWeight:"bold"}}>{`${user.firstname} ${user.lastname} (${user.username})`}</span>
                <button className = "btn btn-danger" onClick = {()=>{
                    followUser(user._id)
                }}>Follow User</button>
            </div>
            
        </div>
    )
}

export default RecommendedUserCard
