import React,{useState} from 'react'
import GroupBox from './groupBox'
import axios from 'axios'
import './groupSearch.css'
function GroupSearchComponent() {
    const [groups, setGroups] = useState([])
    const [search, setSearch] = useState('')
    const getGroup = async (query) =>{
        try{
            const response = await axios.post(`http://localhost:8080/groups/search/`, {query})
            setGroups(response.data)
        }catch(err){
            console.log(err)
        }
    }
    console.log(groups)
    return (
        <>
            <div className="contatiner">
            <form>
            <h3 className = "heading">Search for groups</h3>
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
                    getGroup(search)
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
            {groups.length > 0 ? 
                (
                    groups.map((g)=>(
                        <GroupBox group = {g}/>
                    ))
                )
             : <div>No groups found</div>}
        </div>
            </div>
        </>
    )
}

export default GroupSearchComponent
