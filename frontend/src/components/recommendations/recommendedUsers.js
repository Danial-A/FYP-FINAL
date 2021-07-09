import React,{useState,useEffect} from 'react'
import RecommendedUserCard from './RecommendedUserCard'
import axios from 'axios'
function RecommendedUsers() {
    const [users,setUsers] = useState([])
    const userid = localStorage.getItem('userid')
    useEffect(()=>{
        axios.get('http://localhost:8080/users/random/users')
        
        .then(res=> {
            setUsers(res.data)
        })
        .catch(err=> console.log(err))
    },[])


    const getResult = async (gid) =>{
        try{
          const response = await axios.get(`https://recommendthis.herokuapp.com/rec?grp=${gid}`, {
            headers: {"Access-Control-Allow-Origin": "*"}
          })
          //console.log(response.data)
          const sendData = await axios.post(`http://localhost:8080/users/${userid}/recommended`, {
              users:response.data
          })
          console.log(sendData)
        }catch(err){
          console.log(err)
        }
      }

    return (
        <div className = "recommendedUserWrapper" style = {{backgroundColor:"white",padding:"20px 10px", borderRadius:"10px"}}>
        <h3>Recommended Users </h3>
            {
                users.length > 0 ? users.map(u=>(
                    <RecommendedUserCard user = {u} results = {getResult}/>
                )) : <div>No recommendations yet</div>
            }
        </div>
    )
}

export default RecommendedUsers
