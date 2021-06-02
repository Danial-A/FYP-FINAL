import React,{useState,useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import '../../pages/UserProfile.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import UserCard from './usercard'
import {Link } from 'react-router-dom'
import axios from 'axios'
import FollowCard from '../follow-card/followcard'
import {Tabs, Tab, Badge} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProfileInformation() {
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])


    //Users modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const userid = localStorage.getItem('userid')
    useEffect(()=>{
        //Get user posts
        axios.post('http://localhost:8080/posts/user/posts', {author: localStorage.getItem('username')})
        .then(posts=> {
            setPosts(posts)
        })
        .catch(err => console.log(err))

        //get following and followers
        axios.get(`http://localhost:8080/users/${userid}/getall`)
        .then(res=> {
            setFollowers(res.data.followers)
            setFollowing(res.data.following)
        })
        .catch(err=> console.log(err))
    },[])

 
    return (
        <div className="user-info">
            <div className="user-heading"> 
                <h3>Profile Information</h3>
            </div>
            <div className="information-section">
                <ul>
                    <li><Link><FontAwesomeIcon icon = {faEdit} className = "icon"/>Posts <Badge variant="info">2</Badge></Link></li>
                    <li><Link><FontAwesomeIcon icon = {faThumbsUp} className = "icon"/>Likes <Badge variant="info">7</Badge></Link></li>
                </ul>
                <div className="followers-following-section">
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Followers">
                        <ol style = {{color:"white"}} className = "follower-section">
                        {
                            followers.length > 0 ? (
                                followers.map(f=>(
                                    <FollowCard user = {f}/>
                                ))
                            ) : <div className = "no-followers">You do not have any followers :(</div>
                        }
                    </ol>
                        
                        </Tab>
                        <Tab eventKey="profile" title="Following">
                            <ol style = {{color:"white"}}  className = "follower-section">
                            {
                                following.length > 0 ? (
                                    following.map(f=>(
                                        <FollowCard user = {f}/>
                                    ))
                                ) : <div className = "no-followers">You are not following anyone </div>
                            }
                            </ol>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            
            <>
                <Modal>
                    <UserCard/>
                </Modal>
            </>
            
        </div>
    )
}

export default ProfileInformation
