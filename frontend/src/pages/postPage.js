import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faShare, faSave, faTrash, faEdit, faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostComment from '../components/comments/comment'
import DisplayComments from '../components/comments/comments-display'
import { Button,DropdownButton,Dropdown } from 'react-bootstrap'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/post-component/post.css'
import 'tippy.js/dist/tippy.css'

function PostPage(props) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [likes, setlikes] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        setPost(res.data)
        setComments(res.data.comments)
        setlikes(res.data.likes)
      }).catch(err => console.log("error fetching the post ", err))
  }, [])
  console.log(post)
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
                  <Tippy content= '1'><Link><FontAwesomeIcon icon={faThumbsUp} /></Link></Tippy>
                  <Tippy content = {comments.length}><Link><FontAwesomeIcon icon={faComment} /></Link></Tippy>
                </div>

              </div>

            </div>
          </div>
          <div className="col-6">
            <div style={{ color: "white" }}>
              <PostComment postid={post._id} />
            </div>
            <div >
              <DisplayComments comments={post._id} />
            </div>

          </div>
        </div>

        <div className="row">
        <div className="col-11">
          </div>
          <div className="col-1">
          <Button variant="danger">
        <Link to="/Home"
          style={{ textDecoration: "none", color: "white" }}>
          Back</Link>
      </Button>
            </div>
          </div>

      </div>



  
    </div>
  )
}

export default PostPage
