import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
import axios from 'axios'
import Post from '../components/post-component/post'
import SearchPanel from '../components/userSearch/searchPanel'
import RecommendedUsers from '../components/recommendations/recommendedUsers'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserProfile.css'
import Pagination from '../components/post-component/pagination'

function UserHomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const uid = localStorage.getItem('userid')

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex)

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
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
                <Post posts = {currentPosts} loading= {loading} />
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate= {paginate}/>
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
