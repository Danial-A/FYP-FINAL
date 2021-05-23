import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Axios from 'axios'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faShare, faSave, faTrash, faEdit, faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './post.css'
import 'tippy.js/dist/tippy.css'


function Post({ posts, loading }) {
  const username = localStorage.getItem('username')
  const [liked, setLiked] = useState(false)

  //Handle close/open Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const checkLike = (postid) => {
    axios.post(`http://localhost:8080/posts/${postid}/like`, { username })
      .then(response => {

        if (response.status === 200) {
          setLiked(true)
          if (response.data === 'liked') {
            setLiked(true)
          }
          else {
            setLiked(false)
          }
        }
      })
      .catch(err => console.log(err))
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
                <div className="col-md-6">
                  <span className="user-heading">User:</span> <span>{post.author.username}</span>
                </div>
              </div> 
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-md-8">
                  <div className="post-heading-section">
                    <h4>{post.title}</h4>
                  </div>
                </div>
                <div className="col-md-3">

                <pre><strong>Created:</strong>{moment(post.createdAt).fromNow()}</pre>


                </div>
                <div className="col-md-1">

                  {post.author === localStorage.getItem('userid') ?
                    <div> 
                 
                          <DropdownButton
                            title=""
                            variant="light"
                            id="dropdown-custom-components"
                          >
                            <Dropdown.Item eventKey="1"><FontAwesomeIcon icon={faTrash} onClick={() => DeletePost(post._id)} /> Delete</Dropdown.Item>
                            <Dropdown.Item eventKey="2"><FontAwesomeIcon icon={faEdit} onClick={handleShow} />Edit</Dropdown.Item>
                          </DropdownButton>
                    </div>
                    :
                    <div></div>
                  }
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
                  <Tippy content={`${post.likes.length} ${post.likes.length > 1 ? ('Likes') : ('Like')}`}><Link><FontAwesomeIcon icon={faThumbsUp} onClick={() => checkLike(post._id)} className={`${liked ? ('liked') : ('disliked')}`} /></Link></Tippy>
                  <Tippy content={`${post.comments.length} ${post.comments.length > 1 ? ('Comments') : ('Comment')}`}><Link to={`/user/post/${post._id}`}><FontAwesomeIcon icon={faComment} /></Link></Tippy>
                </div>

              </div>

            </div>
          ))
          ) : <div className="container post-container" style={{ color: "crimson" }}>NO POSTS TO SHOW</div>
      }
      {<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Body</label>
              <textarea class="form-control" id="postbody" placeholder="Body" />
            </div>
            <Button type="submit" variant="danger" >
              Save Changes
                </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
              </Button>
        </Modal.Footer>
      </Modal>}
    </div>
  )
}

export default Post

