import React from 'react'
import axios from 'axios'
import UserSearchBox from './userBox'
import 'bootstrap/dist/css/bootstrap.min.css'
import './userSearch.css'

function UserSearch() { 
    const [users,setUsers] = React.useState([])
    const [search,setSearch] = React.useState('')
    const getUsers =async (query)=>{
        try{
            const response = await axios.post(`http://localhost:8080/users/search/name`, {query})
            setUsers(response.data)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className="contatiner">
            <form>
            <h3 className = "heading">Search for users</h3>
            <div className="input-group mb-3">
                <input 
                id = 'searchtext'
                name = "searchtext"
                type="text" className="form-control" 
                placeholder="Search..." 
                aria-label="Username" 
                aria-describedby="basic-addon1"
                value = {search}
                onChange = {e=>{
                    setSearch(e.target.value)
                    getUsers(search)
                }}
                autoComplete = "off"
                />
            <div className="input-group-prepend">
            <button type = "submit" className = "btn btn-danger" onClick = {(e)=>{
                e.preventDefault()
            }}>Search</button>
            </div>
            </div>
        </form>
        <div className="user-container container-fluid">
            {users.length > 0 ? 
                (
                    users.map((u,index)=>(
                        <UserSearchBox user = {u}/>
                    ))
                )
             : <div>No users found</div>}
        </div>
            </div>
        </div>
    )
}

export default UserSearch
