import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
import axios from 'axios'
import Post from '../components/post-component/post'
import SearchPanel from '../components/userSearch/searchPanel'
import RecommendedUsers from '../components/recommendations/recommendedUsers'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserProfile.css'


function UserHomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const uid = localStorage.getItem('userid')
    
    useEffect(()=>{
        const fetchPosts = async ()=>{
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/posts/${uid}/get/posts`);
            setPosts(response.data);
            setLoading(false)
        }
        fetchPosts()
    }, []);
    
    return (
        <div style ={{backgroundColor: '#1c2237'}}>
       
            <NavigationBar/>
            <div className="container-fluid user-home-container">
            <div className="row">
                <div className="col-md-3">
                    <SearchPanel/>
                </div>
                <div className="col-md-6 mb-5">
                <Post posts = {posts} loading= {loading} />
                </div>
                <div className="col-md-3">
                    <RecommendedUsers/>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default UserHomePage
