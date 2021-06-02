import React,{useState} from 'react'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './groupsDisplayHome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function GroupsDisplay() {
    const userid = localStorage.getItem('userid')
    const [groups,setGroups] = useState([])

    //group creation state
    const [title,setTitle] = useState('')
    const [description,setDescription]= useState('')

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    React.useEffect(async() => {
        try{
            const response =await axios.get(`http://localhost:8080/users/${userid}/groups`)
            setGroups(response.data.groups)
        }catch(Err){
            console.log(Err)
        }
        
    },[userid])
    return (
        <div style = {{color:"white", marginBottom:"10vh"} } className  = "groups-main-container container">
            <div className="main-heading">
                <h4>Your Groups</h4>
                {groups?.length > 0 ? (
                    groups.map((g,i)=>(
                        <div className = "text-crimson"><Link to = {`/group/${g._id}`}>
                            <div className="group-container">
                                <h5>{`${i+1}) ${g.title}`}</h5>
                                <div className="group-description">{g.description}</div>
                            </div>
                        </Link></div>
                    ))
                ) : <div className = "text-crimson">You have not joined any groups yet... <span className = "Create-Group" onClick= {handleShow}>Create new group?</span></div> }
                <div style = {{textAlign:"center"}}><button className = "btn btn-danger" onClick = {handleShow}>Create New Group?</button></div>
                 
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Group!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter the required credentials for creating a group:
                    <form>
                        <div class="form-group">
                        <label for="exampleInputEmail1">Group Title:</label>
                        <input type="text" class="form-control" placeholder="Title.."/>
                        </div>
                        <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <textarea rows= "6" type="text" class="form-control" placeholder="Enter group description i.e what the group is about"/>
                        </div>
                        <small id="emailHelp" class="form-text text-muted">Adding/Removing users will be available once the group is created</small>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Create!
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GroupsDisplay
