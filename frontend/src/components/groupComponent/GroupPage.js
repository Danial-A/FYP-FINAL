import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NavigationBar from '../navigation-bar/userNavbar'
import Footer from '../footer-section/footer'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from '../post-component/post'
import './groupsDisplayHome.css'
function GroupPage({match}) {
    const gid = match.params.id
    const [group, setGroup] = useState({})
    const [groupMembers,setGroupMembers] = useState([])
    const [groupAdmins,setGroupAdmins] = useState([])
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/groups/${gid}/`)
        .then(response=>{
            //console.log(response)
            setGroup(response.data)
            setPosts(response.data.posts)
            setGroupAdmins(response.data.admins)
            setGroupMembers(response.data.groupMembers)

        }).catch(err=>{
            console.log(err)
        })
    },[])
    console.log(groupMembers)
    //form validation

    const {TotalPosts, setTotalPosts} = useState([]);
    const initialValues = {
        title: '',
        body: '',
        author: localStorage.getItem('userid'),
        postType: 'group'
    }
    const onSubmit = (values,onSubmitProps) =>{
        axios.post(`http://localhost:8080/groups/${gid}/posts/create`, values)
        .then(res =>{
            window.alert("Post Added!");
            setTotalPosts([...setTotalPosts, res.data])
            onSubmitProps.resetForm()
            
        })
        .catch(err =>{ console.log("Error: "+err)})
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('This field is required..'),
        body: Yup.string().required('This field is required..')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    const handleReload = ()=>{
        window.location.reload(false)
    }
    return (
        <div className = "container-fluid bottom-margin">
        <NavigationBar/>
            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="container group-info">
                        <h3>Group information</h3>
                        <h5>Title: {group?.title}</h5>
                        <h5>Description: <small>{group?.description}</small></h5>
                    </div>
                    <div className="container create-post mt-5">
                         <h3>Create post</h3>
                         <form onSubmit = {formik.handleSubmit}>
                         <div className="row">
                         <div className="col post-heading">
                             <label htmlFor="postheading">Post Heading:</label>
                             <input type="text" name="title" id="inputBackground" style = {{width: "100%"}}
                                 placeholder ="Enter the post title..."
                                 onChange = {formik.handleChange}
                                 onBlur = {formik.onBlur}
                                 value = {formik.values.title}
                             />
                             {formik.errors.title && formik.touched.title ? <div style = {{color: 'crimson'}}><p>{formik.errors.title}</p></div> : null}
                         </div>
                         </div>
                         <div className="row">
                         <div className="col">
                             <div className="post-body">
                                 <label htmlFor="body">Post Body: </label>
                                 <textarea name="body" id="inputBackground" rows="6" 
                                 placeholder = "Enter the post description...."
                                 onChange = {formik.handleChange}
                                 onBlur = {formik.onBlur}
                                 value = {formik.values.body}
                                 />
                                 {formik.errors.body && formik.touched.body ? <div style = {{color: 'crimson'}}><p>{formik.errors.body}</p></div> : null}
                             </div>
                             </div>
                         </div>
                         <div className="add-post-button">
                             <button type = "submit" className = "btn btn-danger mb-3" onClick = {()=> handleReload()}>Add Post!</button>
                         </div>
                         </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container group-posts">
                        <h3 className="mb-4 ml-3 ">Group Posts</h3>
                        <Post posts = {posts}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="container members-section ">
                        <h5>Group Members</h5>
                        <ul>
                            {
                                groupMembers.map(
                                    u=>(
                                        groupMembers.length > 0 ? <li>{u.username}</li> : <li>No users</li>
                                    )
                                )
                            }
                        </ul>
                        
                    </div>
                    <div className="container admins mt-3">
                        <h5>Group Admins</h5>
                        <ul>
                            {
                                groupAdmins.map(a=>(
                                    <li>{a.username}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="container group-chat mt-3">
                        <h5 style ={{textAlign:"center"}} className = "mt-3">Group Chat</h5>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default GroupPage
