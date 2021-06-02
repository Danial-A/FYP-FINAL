import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
function RecommendedUserCard({user}) {
    
    return (
        <div className = "userCard">
        <div className = "user-box">
        <Link><FontAwesomeIcon icon = {faUser} className = "user-icon"/>{`${user.firstname} ${user.lastname} (${user.username})`}</Link>
        <button className = "btn btn-danger">Follow User</button>
        </div>
        </div>
    )
}

export default RecommendedUserCard
