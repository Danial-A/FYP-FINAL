import React, {useState, useEffect} from 'react'
import axios from 'axios'
import NavigationBar from '../components/navigation-bar/userNavbar'
import {Container, Row, Col} from 'react-bootstrap'
import Footer from '../components/footer-section/footer'
import Post from '../components/post-component/post'
import Pagination from '../components/post-component/pagination'
import ProfileInformation from '../components/Profile-Information/ProfileInformation'
import UserInformation from '../components/Profile-Information/UserInformation'
import GroupsDisplay from '../components/groupComponent/groupsDisplayHome'
import UserPost from '../components/create-post/create-post'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserProfile.css'


function UserProfile() {
    
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);



    useEffect(()=>{
  
        const fetchPosts = async ()=>{
            setLoading(true);
            const response = await axios.post('http://localhost:8080/posts/user/posts', {"author": localStorage.getItem('userid')});
            setPosts(response.data);
            setLoading(false)
        }
        fetchPosts()

    }, []);

    //Current Posts
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex)
    

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    return (
        <div style = {{backgroundColor: '#1c2237', height:"auto"}}>
            <NavigationBar/>
            <div className="cover-container">
                <div className="cover-image">
                    <img src="/images/background.jpg" alt=""/>
                </div>
                <div className="profile-image">
                    <img src="/images/Dp.svg" alt=""/>
                </div>
            </div>
            <Container fluid className = "user-information-section">
                <Row>
                    <Col  lg = {3} className = "demo">
                        <UserInformation/>
                    </Col>
                        
                    <Col lg = {6} className = "demo user-post-section">
                        <UserPost totalposts = {posts}/>
                        <div className="post-heading"s style = {{textAlign:'center'}}>
                            <h2>User Posts</h2>
                        </div>
                        <Post posts = {currentPosts} loading= {loading} />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate= {paginate}/>
                        </div>
                      
                        <GroupsDisplay/>
                    </Col>
                    <Col lg = {3} className = "demo">
                        
                        <ProfileInformation/>
                    </Col>
                </Row>
            </Container>
            <div className="footer" style = {{position:"relative"}}>
                <Footer  />
            </div>
            
            
        </div>
    )
}

export default UserProfile
