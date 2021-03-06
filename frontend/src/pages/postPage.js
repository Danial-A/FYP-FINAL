import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostComment from '../components/comments/comment'
import DisplayComments from '../components/comments/comments-display'
import {DropdownButton,Dropdown } from 'react-bootstrap'
import {toast } from 'react-toastify'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/post-component/post.css'
import 'tippy.js/dist/tippy.css'

function PostPage(props) {

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

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [likes, setlikes] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${props.match.params.id}`)
      .then(res => {
        setPost(res.data)
        setComments(res.data.comments)
        setlikes(res.data.likes)
      }).catch(err => console.log("error fetching the post ", err))
  },[props.match.params.id])

  const created = new Date(post.createdAt)
  console.log(created.getMonth())

    const handleLike = async () =>{
      try{
        const response = await axios.post(`http://localhost:8080/posts/${props.match.params.id}/like`, {userid: localStorage.getItem('userid')})
        
        setlikes(response.data.likes)
        liked(response.data.message)
      }catch(err){
        console.log(err)
      }
    }

   
  
  return (
    <div>
      <NavigationBar />

      <div className="container">
        <div className="row">


          <div className="col-6">
            <div className="post-container">
              {/* <div className="row user-info-row">
                <div className="col-md-6">
                  <span className="user-heading">User: {post.author}</span>
                </div>
                <div className="col-md-6 created-at">
                  <pre><strong>Created: {moment(post.createdAt).fromNow()}</strong> </pre>
                </div>
              </div> */}


              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-md-7">
                  <div className="post-heading-section">
                    <h4>{post.title}</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <pre><strong>Created: {moment(post.createdAt).fromNow()}</strong> </pre>
                </div>

                <div className="col-md-2 text-right">


                  <DropdownButton
                    title=""
                    variant="light"
                    id="dropdown-custom-components"
                  >
                    <Dropdown.Item eventKey="1"><FontAwesomeIcon icon={faTrash}/> Delete</Dropdown.Item>
                    <Dropdown.Item eventKey="2"><FontAwesomeIcon icon={faEdit}/>Edit</Dropdown.Item>
                  </DropdownButton>
       
                </div>
              </div>




              <div className="row">
                <div className="col">
                  <div className="post-body">
                    <p>{post.body}</p>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-6 like-icons-row">
                  <Tippy content= {likes.length > 0 ? likes.length : "0"}><Link><FontAwesomeIcon icon={faThumbsUp} onClick = {()=> handleLike()} /></Link></Tippy>
                  <Tippy content = {comments.length > 0 ? comments.length : '0'}><Link><FontAwesomeIcon icon={faComment} /></Link></Tippy>
                </div>

              </div>

            </div>
          </div>
          <div className="col-6">
            <div style={{ color: "white" }}>
              <PostComment postid={post._id} />
            </div>
            <div >
              <DisplayComments comments={post._id} author = {post.author}/>
            </div>

          </div>
        </div>

        <div className="row">
        <div className="col-11">
          </div>
         { /*<div className="col-1">
          <Button variant="danger" onClick = {() => getResult()}>Get results
        {/*<Link to="/Home"
          style={{ textDecoration: "none", color: "white" }}>
            Back</Link>
      </Button>
          </div>*/}
          </div>

      </div>



  
    </div>
  )
}

export default PostPage
