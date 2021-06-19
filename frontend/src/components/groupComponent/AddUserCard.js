import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './membercard.css'
import axios from 'axios'
import {toast} from 'react-toastify'
function AddUserCard({user,groupid}) {
    toast.configure()
    const add = (message)=>{
        toast.success(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }

    const addUser = async (id)=>{
        try{
            const response = await axios.post(`http://localhost:8080/groups/${groupid}/members/add`, {userid:id})
            if(response.data === '')
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className = "mb-2" style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div className = "card-container" style = {{width:"15vw"}}>
            <img src="/images/Dp.svg" alt="" height = "40px" style = {{marginRight:"10px"}}/>
            {user.firstname} {user.lastname}
           
        </div>
        <button className = 'btn btn-danger' style = {{height:"70px"}} onClick = {()=> addUser(user._id)}>Add</button>
        </div>
    )
}

export default AddUserCard
