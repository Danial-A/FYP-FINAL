import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './create-post.css'
import {Card} from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'


function UserPost({setTotalPosts, posts}) {

    const [files,setFiles] = useState(null)

    const inputRef = useRef(null)

    const initialValues = {
        title: '',
        body: '',
        author: localStorage.getItem('userid'),
        postType: 'profile'
    }
    const onSubmit = async (values, onSubmitProps) => {
        try{
            const res =await axios.post('http://localhost:8080/posts/add', values)
            console.log(res.data)
            setTotalPosts([...posts, res.data.post])
            onSubmitProps.resetForm()
        }catch(err){
            console.log(err)
        }
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

    return (
        <div>
            <div className="container">
                <h3 >Create a new post..</h3>


                <form onSubmit={formik.handleSubmit}>

                    <Card>
                        <Card.Body>
                        <div className="row">
                        <div className="col post-heading">
                            <label htmlFor="postheading">Post Title:</label>
                            <input type="text" name="title" id="title" style={{ width: "100%" }}
                                placeholder="Enter the post title..."
                                onChange={formik.handleChange}
                                onBlur={formik.onBlur}
                                value={formik.values.title}
                            />
                            {formik.errors.title && formik.touched.title ? <div style={{ color: 'crimson' }}><p>{formik.errors.title}</p></div> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="post-body">
                                <label htmlFor="body">Post Description: </label>
                                <textarea name="body" id="body" rows="6"
                                    placeholder="Enter the post description...."
                                    onChange={formik.handleChange}
                                    onBlur={formik.onBlur}
                                    value={formik.values.body}
                                />
                                {formik.errors.body && formik.touched.body ? <div style={{ color: 'crimson' }}><p>{formik.errors.body}</p></div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <div className="post-image-btn">
                        <input type="file" multiple  id = "file" ref = {inputRef} style = {{display:"none"}} accept = "image/*"/>
                                
                               <FontAwesomeIcon className = "images-icon" icon = {faImages} size = "2x" onClick = {(e)=>{
                                   e.preventDefault()
                                   inputRef.current.click()
                               }}/>
                        </div>
                        </div>
                    </div>
                    

                    <div className="add-post-button btn-right">
                        <button type="submit">Create Post!</button>
                        
                    </div>
                        </Card.Body>
                    </Card>
      




                </form>
            </div>




        </div>
    )
}

export default UserPost
