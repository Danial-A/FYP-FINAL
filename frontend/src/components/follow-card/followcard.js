import React, {useState,useEffect} from 'react'
import './followcard.css'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
function FollowCard({user}) {
    toast.configure()
    const removeUserToast  = (message)=>{
        toast.success(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }


    const [image,setImage] = useState('')
    const [show, setShow] = useState(false);
    const currentUser = localStorage.getItem('userid')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const removeFollower = (uid) =>{
        axios.post(`http://localhost:8080/users/follower/${currentUser}/remove`, {userid: uid})
        .then(res => {
            if(res.data === "This user is not your follower"){
                axios.post(`http://localhost:8080/users/following/${currentUser}/remove`, {userid : uid})
                .then(response => removeUserToast(response.data))
                .catch(err=> console.log(err))
            }
            else{
                removeUserToast(res.data)
            }
        })
        .catch(err=> console.log(err))
    }

    useEffect(()=>{
        if(user.profileImage){
            setImage(`http://localhost:8080/uploads/${user._id}/${user.profileImage}`)
        }
    },[user])

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
                <img src = {image ? image : "/images/Dp.svg"} alt="" height = "150"/>
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
