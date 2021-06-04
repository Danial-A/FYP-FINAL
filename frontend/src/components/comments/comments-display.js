import React,{useState,useEffect} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'
function DisplayComments(props) {
    const [comments,setComments] = useState([])
    const [commentValue, setCommentValue] = useState('')
    useEffect(()=>{
        axios.get(`http://localhost:8080/posts/${props.comments}/comments`)
        .then(c=>{
            setComments(c.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const deleteComment =async (id) =>{
        const option = window.confirm("Are you sure you want to delete this comment?")
        if(option){
            axios.post(`http://localhost:8080/posts/${id}/comment/delete`)
            .then(res=>{
                console.log(res.data)
               
               
            })
            .catch(err=> console.log(err))
        }else{
            return null
        }
    }

    const editComment =async (id) =>{
        try{
            const response = await axios.post(`http://localhost:8080/posts/${id}/comment/update`,{comment:commentValue})
            console.log(response.data)
            setCommentValue('')
            handleClose()

        }catch(err){
            console.log(err)
        }
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="display-comments hs">
            <p> <b>Comments: </b> </p>
            {
                comments.length > 0 ? (comments.map(comment => (
                    <div className="container" key = {comment._id} style = {{borderBottom:"1px solid black", margin:"20px 0 10px 0px"}}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="post-heading-section">
                                    <p> <b>Username: {comment.userid.username}</b></p>
                                </div>
                            </div>
                            <div className="col-md-3 mm">
                               <small>Created:{moment(comment.createdAt).fromNow()}</small> 
                            </div>
                            <div className="col-md-3 mm">
                            <small>
                            <span className = "icons-post" onClick ={()=> deleteComment(comment._id)}><FontAwesomeIcon icon={faTrash}  /> Delete</span>
                            <span className = "icons-post" onClick = {handleShow}><FontAwesomeIcon icon={faEdit}  /> Edit</span>
                            </small>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-12">

                                <p>{comment.body}</p>

                            </div>
                            <>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>{comment.userid.username.toUpperCase()}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <label>Comment:</label>
                              <input type="text" className = "form-control comment-input" name = "body" id = "body"
                              value = {commentValue}
                              onChange = {(e)=> setCommentValue(e.target.value)}
                              />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="danger" onClick={()=>editComment(comment._id)}>
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        </div>
                        {/* <div className="comment-side">
                                <pre><strong>{comment.username}:</strong> </pre>
                                <p> {comment.body}</p>

                            </div>
                            <div className="created-side">
                                <pre><strong>Created: </strong> {moment(comment.createdAt).fromNow()}</pre>
                            </div> */}

                    </div>
                ))) : <div>No Comments yet..</div>
            }
       
        </div>
    )
}

export default DisplayComments

{/*useEffect(async()=>{
    try{
        if(props.comments.length > 0){
            setComments(props.comments)
        }
    }catch(err){

    }
        
    //     if(props.postid){
    //         const response =await Axios.get(`http://localhost:8080/posts/${props.postid}/comments`)
    //         response.then(res=> {
    //         setComments(res.data)
    //     }).catch(err=> console.log(err))
    //     }else{
            
    //     }  
    // }catch(err){
    //     console.log(err)
    // }
    
},[])*/}