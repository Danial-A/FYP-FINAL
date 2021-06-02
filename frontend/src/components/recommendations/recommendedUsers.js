import React,{useState,useEffect} from 'react'
import RecommendedUserCard from './RecommendedUserCard'
import axios from 'axios'
function RecommendedUsers() {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/users')
        
        .then(res=> {
            const newUsers = res.data.filter(user=> user._id.toString() !== localStorage.getItem('userid'))
            setUsers(newUsers.slice(0,2))
        })
        .catch(err=> console.log(err))
    },[])
    console.log(users)
    return (
        <div className = "recommendedUserWrapper" style = {{backgroundColor:"white",padding:"20px 10px", borderRadius:"10px"}}>
        <h3>Recommended Users </h3>
            {
                users.length > 0 ? users.map(u=>(
                    <RecommendedUserCard user = {u}/>
                )) : <div>No recommendations yet</div>
            }
        </div>
    )
}

export default RecommendedUsers
