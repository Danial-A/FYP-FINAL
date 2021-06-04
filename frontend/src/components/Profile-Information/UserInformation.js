import { faUser, faEnvelope, faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button, Card, ListGroup, OverlayTrigger,Tooltip } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import './UserInformation.css'
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserInterests from '../interests/UserInterests'
import {toast } from 'react-toastify'


function UserInformation() {

    toast.configure()
    const AddedLanguage = (message)=>{
        toast.success(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
    const user = localStorage.getItem('userid')
    const [User, setUser] = useState({})
    const [interests, setInterests] = useState([])
    const [interest, setInterest] = useState("")
    const [file, setFile] = useState()
    const [profileImg, setProfileImg] = useState()
  
    //Show hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Profile image modal
    const [profile, setProfileShow] = useState(false);
    const profileClose = () => setProfileShow(false);
    const profileShow = () => setProfileShow(true);

    useEffect(() => {
        async function getUserInfo() {
            const UserInformation = await axios.get(`http://localhost:8080/users/${user}`)
            setUser(UserInformation.data)
            setInterests(UserInformation.data.interests)
            setProfileImg(`http://localhost:8080/${UserInformation.data.profileImage}`)
        }
        getUserInfo()
    })

    //Edit user information
    const initialValues = {
        firstname: User.firstname,
        lastname: User.lastname,
        username: User.username,
        emailid: User.emailid,
        dob: User.dob
    }
    const onSubmit = (values) => {
        // axios.post(`http://localhost:8080/users/${user}/update`, values)
        // .then(response=> console.log(response))
        // .catch(err=> console.log(err))
        // console.log(values)
    }
    const validationSchema = Yup.object({
        firstname: Yup.string().required("First name is required..."),
        lastname: Yup.string().required("Last name is required..."),
        username: Yup.string().required("Username is required..."),
        emailid: Yup.string().required('Email id is required...'),
        dob: Yup.date().required("DOB is required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    let tooltip = <Tooltip><strong>Edit Profile Information</strong></Tooltip>;
    // console.log(formik.values)

    const handleAddInterest =async () =>{
        try{
            if(interest === "" || interest === null){
                window.alert("Include a language first...")
            }else{
                const response = await axios.post(`http://localhost:8080/users/${user}/interests/add`, {interest})
                setInterests([...interests, response.data.interest])
                AddedLanguage(response.data.message)
                setInterest('')
            } 
        }catch(err){
            console.log(err)
        }
    }

    const handleImageUpload =async ()=>{
        try{
            const data = new FormData()
            data.append("file", file)
            const imageUpload =await axios.post(`http://localhost:8080/users/${user}/image/upload`, data)
            console.log(imageUpload.data)
        }catch(err){
            console.log(err)
        }

    }   
    return (
     
        <div className="user-information-section">
            <div className="user-information-heading">
                
                <h3>User Information  <OverlayTrigger placement="top" overlay={tooltip}>
                    <FontAwesomeIcon icon = {faEdit}  onClick={handleShow} className = "icon"/>
                    </OverlayTrigger>
                    </h3>
            </div>
            <div className="user-information-display">
                {/* <ul>
                    <li><FontAwesomeIcon icon={faUser} className="icon" />Name: <pre> {User.firstname} {User.lastname}</pre></li>
                    <li><FontAwesomeIcon icon={faUsers} className="icon" />Username:<pre> {User.username}</pre></li>
                    <li><FontAwesomeIcon icon={faEnvelope} className="icon" />Email:<pre> {User.emailid}</pre></li>
                    <li><FontAwesomeIcon icon={faCalendar} className="icon" />DOB:<pre> {moment(User.dob).format("MMMM DD YYYY")}</pre></li>

                </ul> */}

                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profileImg && profileImg !== ''? profileImg : "/images/Dp.svg"} />
                    <ListGroup variant="flush">
                        <ListGroup.Item><FontAwesomeIcon icon={faUser} className="icon" />Name: <pre> {User.firstname} {User.lastname}</pre></ListGroup.Item>
                        <ListGroup.Item><FontAwesomeIcon icon={faUsers} className="icon" />Username:<pre> {User.username}</pre></ListGroup.Item>
                        <ListGroup.Item><FontAwesomeIcon icon={faEnvelope} className="icon" />Email:<pre> {User.emailid}</pre></ListGroup.Item>
                        <ListGroup.Item><FontAwesomeIcon icon={faCalendar} className="icon" />DOB:<pre> {moment(User.dob).format("MMMM DD YYYY")}</pre></ListGroup.Item>

                    </ListGroup>
                    <button className = "btn btn-danger" onClick = {profileShow}>Change Profile Picture?</button>
                </Card>
            </div>
            <div style = {{backgroundColor:"white", borderRadius:"10px", maxWidth:"68%"}} className = "mt-4">

            <h5 style ={{textAlign:"center"}}>Preferred Languages</h5>
            <div className="interests">
                {interests.length > 0 ? <UserInterests interests = {interests}
                    setInterests = {setInterest}
                /> : <div> You do not have any preferred languages</div>}
            </div>
            <div className="addBtn mt-4">
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Enter a language name e.g. python" 
                value = {interest}
                onChange = {e=> setInterest(e.target.value)}
            />
            <div class="input-group-append">
            <button className = "btn btn-danger" onClick = {(e)=>{
                e.preventDefault()
                handleAddInterest()
            }}>Add</button>
            </div>
          </div>
            </div>
            </div>

            {/*Change image modal*/}
            <>
                <Modal show={profile} onHide={profileClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form encType = "multipart/form-data">
                        <div class="input-group mb-3">
                        <input type="file" class="form-control" name = "file" accept = ".jpg"
                            onChange = {event=>{
                                const file = event.target.files[0]
                                console.log(event.target.files)
                                setFile(file)
                            }}
                        />
                        <div class="input-group-append">
                        <button className = "btn btn-danger" onClick = {(e)=>{
                            e.preventDefault()
                            handleImageUpload()
                        }}>Upload</button>
                        </div>
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={profileClose} style = {{backgroundColor:"#1c2237"}}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>



            <Modal show={show} onHide={handleClose} className="modal-user-update">
                <Modal.Header closeButton>
                    <Modal.Title >UPDATE USER INFORMATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name: </label>
                            <input
                                type="text" name="firstname"
                                className="form-control" id="firstname"
                                placeholder="Enter the firstname.."
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name: </label>
                            <input type="text" name="lastname"
                                className="form-control" id="lastname"
                                placeholder="Enter the lastname.."
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username"> Username: </label>
                            <input type="text" name="username"
                                className="form-control" id="username"
                                placeholder="Enter the username.."
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email ID: </label>
                            <input type="email" name="emailid"
                                className="form-control" id="email"
                                value={`${formik.values.emailid}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth: </label>
                            <input type="date" name="dob"
                                className="form-control"
                                id="dob"
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {/* <input type="text" name="teext" id="" value="name" /> */}
              
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button type="submit" variant="danger">
                            save changes
                        </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>

            </Modal>

            {/* <div className="justify-content-center">
                <Button variant="success" onClick={handleShow}>Edit Profile Information</Button>
            </div> */}
        </div>
    )
}

export default UserInformation
