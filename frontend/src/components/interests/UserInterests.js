import React from 'react'
import './UserInterests.css'
function UserInterests({interests}) {
    const classes = ['#f7d0cd', '#f7d0cd', '#d3f7cd','#a1ced6','#d594f7']
    const filtered = [... new Set(interests)]
    return (
        <>
            {
                filtered.map(i=>(
                    <div className = "interest"><span className = "tag" style ={{
                        backgroundColor:`${classes[Math.floor(Math.random() * classes.length)]}`
                    }}>{i.toUpperCase()}</span></div> 
                ) )
            }
        </>
    )
}

export default UserInterests
