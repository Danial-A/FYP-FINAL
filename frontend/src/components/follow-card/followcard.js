import React, {useState} from 'react'
import './followcard.css'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
function FollowCard({user}) {
    const [show, setShow] = useState(false);
    const currentUser = localStorage.getItem('userid')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const removeFollower = (uid) =>{
        axios.post(`http://localhost:8080/users/follower/${currentUser}/remove`, {userid: uid})
        .then(res => console.log(res.data))
        .catch(err=> console.log(err))
    }
    return (
        <>
        <div className="follow-card" onClick = {handleShow}>
                <img className = 'conversationImg' src="/images/Dp.svg" alt="" />
                <span className="follow-name">{user.firstname} {user.lastname}</span>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title >{user.firstname} {user.lastname}</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
            <div className="user-modal-container">
            <div className="user-modal-image-container mb-3">
                <img src="/images/dp.svg" alt="" height = "150"/>
            </div>
                <p>Username : {user.username}</p>
                <p>Email Id: {user.emailid}</p>
                <p>DOB : {moment(user.dob).format("Do MMMM, YYYY")}</p>
                <div className="remove-btn mt-3">
                    <button className = "btn btn-danger" onClick ={()=> removeFollower(user._id)}>Remove</button>
                </div>
                
            </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default FollowCard
