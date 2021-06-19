import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Axios from 'axios'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './post.css'
import 'tippy.js/dist/tippy.css'
import {toast} from 'react-toastify'
import {SRLWrapper} from 'simple-react-lightbox'



function Post({ posts, loading }) {
  const images = [
    {
      source:"/images/background.jpg"
    },
    {
      source:"/images/background.jpg"
    },
    {
      source:"/images/background.jpg"
    }
  ]
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)



  toast.configure()
  const liked = (response)=>{

    if(response === 'Post Unliked'){
      toast.error(response, {
        position:"top-center",
        autoClose:3000,
        hideProgressBar:true,
        pauseOnHover:true,
        closeOnClick:true
    })
    }
    else{
      toast.success(response, {
        position:"top-center",
        autoClose:3000,
        hideProgressBar:true,
        pauseOnHover:true,
        closeOnClick:true
    })
    }
    
  }

  const userid = localStorage.getItem('userid')
  

  //Handle close/open Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [title,setTitle] = useState('')
  const [body,setBody] = useState('')


  const checkLike =async (postid) => {
    try{
      const response = await axios.post(`http://localhost:8080/posts/${postid}/like`, {userid})
      liked(response.data.message)
    }catch(err){
      console.log(err)
    }
  }


  const DeletePost = (postid) => {
    const choice = window.confirm("Are you sure you want to delete this post?")
    if (choice) {
      Axios.delete(`http://localhost:8080/posts/delete/${postid}`)
        .then(res => {
          window.alert("Post Deleted");

          console.log(res.data)
        })
        .catch(err => { console.log(err) })
    } else {
      return null
    }

  }

  const editPost =async (id)=>{
      try{
        const response = await axios.post(`http://localhost:8080/posts/update/${id}`, {
          title,body
        })
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
  }

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div className="container-fluid posts-section">
    
      {
        posts.length > 0 ?
          (posts.map(post => (
            
            <div key={post._id} className="post-container container" >
              <div className="row user-info-row">
                <div className="col-md-8">
                  <span className="user-heading">User:</span> <span>{post.author.username}</span>
                </div>
                <div className="col-md-4">
                {post.author._id?.toString() === localStorage.getItem('userid') ?
                  <div className = "icons-row"> 
                      <span className = "icons-post" onClick = {()=> DeletePost(post._id)}><FontAwesomeIcon icon={faTrash}  /> Delete</span>
                    <span className = "icons-post" onClick = {handleShow}><FontAwesomeIcon icon={faEdit}  /> Edit</span>
                  </div>
                  :
                 <div></div>
                }
              </div>
              </div> 
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-md-6">
                  <div className="post-heading-section">
                    <h4>{post.title}</h4>
                  </div>
                </div>
                <div className="col-md-3">

                <pre><strong>Created:</strong>{moment(post.createdAt).fromNow()}</pre>
                </div>
               
              </div>
              <div className="row">
                <div className="col">
                  <div className="post-body">
                    <p>{post.body}</p>
              {/*<SRLWrapper>
                    <div className="post-image">
                    <img src="/images/background.jpg" alt="" />
                    </div>
                    <div className="post-image">
                    <img src="/images/background.jpg" alt="" />
                    </div>
              </SRLWrapper>*/} 
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 like-icons-row">
                  <Tippy content={`${post.likes.length} ${post.likes.length > 1 ? ('Likes') : ('Like')}`}><Link><FontAwesomeIcon icon={faThumbsUp} onClick={() => checkLike(post._id)} className='disliked' /></Link></Tippy>
                  <Tippy content={`${post.comments.length} ${post.comments.length > 1 ? ('Comments') : ('Comment')}`}><Link to={`/user/post/${post._id}`}><FontAwesomeIcon icon={faComment} /></Link></Tippy>
                </div>

              </div>
              <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input type="text" class="form-control" placeholder= "title"
                value = {title}
                onChange = {e=> setTitle(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Body</label>
              <textarea class="form-control" id="postbody" placeholder="Body"
              value = {body}
              onChange = {e=> setBody(e.target.value)}
              />
            </div>
            <Button type="submit" variant="danger" onClick = {()=> editPost(post._id)}>
              Save Changes
            </Button>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          
      </>


            </div>
          ))
          ) : <div className="container post-container" style={{ color: "crimson" }}>NO POSTS TO SHOW</div>
      }
      


    </div>
  )
}

export default Post

