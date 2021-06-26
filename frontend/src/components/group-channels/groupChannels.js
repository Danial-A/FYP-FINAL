import React from 'react'
import {Link} from 'react-router-dom'
import './groupChannels.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function GroupChannels({id}) {
    return (
        <div className = "channelsWrapper">
           <Link className = "item" to = {`/room/${id}`}><button className = "btn btn-danger ">Channel 1</button></Link> 
           <Link className = "item"><button className = "btn btn-danger ">Channel 1</button></Link> 

        </div>
    )
}

export default GroupChannels
