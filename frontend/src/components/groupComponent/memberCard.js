import React from 'react'
import './membercard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function MemberCard({user}) {
    return (
        <div className = "card-container mb-2">
            <img src="/images/Dp.svg" alt="" height = "40px" style = {{marginRight:"10px"}}/>
            {user}
        </div>
    )
}

export default MemberCard
