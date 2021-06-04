import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import {toast} from 'react-toastify'
import './membercard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function MemberCard({user, groupid}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    toast.configure()
    const removeuser = (message)=>{
        toast.warning(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }


    const removeUser = async (id)=>{
      try{
          const response = await axios.post(`http://localhost:8080/groups/${groupid}/members/remove`, {userid:id})
          removeuser(response.data)
      }catch(err){
          console.log(err)
      }
  }
    return (
        <div className = "card-container mb-2" onClick = {handleShow}>
            <img src="/images/Dp.svg" alt="" height = "40px" style = {{marginRight:"10px"}}/>
            {user.firstname} {user.lastname}

            <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{user.firstname.toUpperCase()} {user.lastname.toUpperCase()}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="user-modal-container">
              <div className="user-modal-image-container mb-3">
                  <img src = "/images/Dp.svg" alt="" height = "150"/>
                </div>
                  <p>Username : {user.username}</p>
                  <p>DOB : {moment(user.dob).format("Do MMMM, YYYY")}</p>
                  <div className="remove-btn mt-3">
                      <button className = "btn btn-danger" onClick = {()=> removeUser(user._id)}>Remove</button>
                  </div>
                  
              </div>
              </Modal.Body>
             
            </Modal>
          </>
        </div>
    )
}

export default MemberCard
