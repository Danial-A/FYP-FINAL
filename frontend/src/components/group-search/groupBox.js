import React from 'react'
import './groupSearch.css'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

function GroupBox({group}) {
    console.log(group)
    return (
        <>
        <div className = "group-box">
        <div className="titleWrapper">
        <span style = {{fontWeight:"bold"}}>Group:</span> <span className= "group-title">{group.title}</span>
        </div>
        <div className="descriptionWrapper">
           <strong>Description: </strong> {group.description}
        </div>
            <div className="usersWrapper">
            <Link style = {{textDecoration:"none", color:"black"}}><FontAwesomeIcon icon = {faUser} className = "user-icon"/>Total Members: {group.groupMembers.length}</Link>
            </div>
            <button className = "btn btn-danger"
            >Join group?</button>
        </div>
        </>
    )
}

export default GroupBox
