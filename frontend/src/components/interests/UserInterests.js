import axios from 'axios'
import React from 'react'
import {toast} from 'react-toastify'
import './UserInterests.css'
function UserInterests({interests, setInterests}) {
    toast.configure()
    const deleteLanguage = (message)=>{
        toast.warning(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }


    const filtered = [... new Set(interests)]

    const handleRemove = async(interest) =>{
        const response = window.confirm("Remove language?")
        if(response){
            const remove =await axios.post(`http://localhost:8080/users/${localStorage.getItem('userid')}/interests/remove`,{interest})
            setInterests([...remove.data.interests])
            deleteLanguage(remove.data.message)
            
        }
    }
    return (
        <>
            {
                filtered.map(i=>(
                    <div className = "interest" onClick = {()=> handleRemove(i)}><span className = "tag" style ={{
                        backgroundColor:"#1c2237"
                    }}>{i?.toUpperCase()}</span></div> 
                ) )
            }
        </>
    )
}

export default UserInterests
