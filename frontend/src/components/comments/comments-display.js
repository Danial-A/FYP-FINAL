import React,{useState,useEffect} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import axios from 'axios'
function DisplayComments(props) {
    const [comments,setComments] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/posts/${props.comments}/comments`)
        .then(c=>{
            setComments(c.data)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    return (
        <div className="display-comments hs">
            <p> <b>Comments: </b> </p>
            {
                comments.length > 0 ? (comments.map(comment => (
                    <div className="container" key = {comment._id} style = {{borderBottom:"1px solid black", margin:"20px 0 10px 0px"}}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="post-heading-section">
                                    <p> <b>{comment.userid.username}</b></p>
                                </div>
                            </div>
                            <div className="col-md-4 mm">
                               <small>Created:{moment(comment.createdAt).fromNow()}</small> 
                            </div>
                            <div className="col-md-2 mm">
                            <small>
                                <DropdownButton

                                    title=""
                                    variant="light"
                                    id="dropdown-custom-components"
                                >
                                    <Dropdown.Item eventKey="1"><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                    <Dropdown.Item eventKey="2"><FontAwesomeIcon icon={faEdit} />Edit</Dropdown.Item>

                                </DropdownButton>
                                </small>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-12">

                                <p>{comment.body}</p>

                            </div>
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