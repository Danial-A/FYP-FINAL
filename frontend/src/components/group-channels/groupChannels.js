import React,{useState, useEffect} from 'react'
import { faTrash, faTrophy} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {Link} from 'react-router-dom'
import axios from 'axios'
import './groupChannels.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function GroupChannels({groupid}) {

    const [channelName, setChannelName] = useState('')
    const [channels,setChannels] = useState([])




    //setting channels
    useEffect(()=>{
        const getChannels = async () =>{
            try{
                const res = await axios.get(`http://localhost:8080/groups/${groupid}/channels`)
                setChannels(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getChannels()
    },[])


    const handleSubmit = async()=>{
        try{
            const res = await axios.post(`http://localhost:8080/groups/${groupid}/channels/add`,{
            channelName
        })
        setChannels(res.data.channels)
        setChannelName('')
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async (id) =>{
        try{
            const res = await axios.post(`http://localhost:8080/groups/${groupid}/channels/delete`,{
                id
            })
            setChannels(channels.filter(c=> c._id !== id))
            window.alert(res.data)
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className = "channelsWrapper">
           {
               channels.length > 0 ? channels.map((c,i)=>(
               <div className = "channelContainer"><div> <Link className = "item" to = {`/room/${c._id}`}><button className = "btn btn-danger ">{i+1}. {c.channelName}</button></Link></div><FontAwesomeIcon className = "channel-delete-icon" icon = {faTrash} size = "lg" onClick = {(e)=>{
                    e.preventDefault()
                    handleDelete(c._id)
               }}/></div>
               )) : <div>No channels created</div>
                
           }
           {
               channels.length > 5 ? null : <div class="input-group mt-3">
               <input type="text" class="form-control" placeholder="Channel Name..."
               value = {channelName}
                onChange  ={(e)=> setChannelName(e.target.value)}
               />
               <div class="input-group-append">
                 <button className = "btn btn-danger" onClick= {(e)=>{
                     e.preventDefault()
                     handleSubmit()
                 }}>Create!</button>
               </div>
             </div>
           }

        </div>
    )
}

export default GroupChannels
