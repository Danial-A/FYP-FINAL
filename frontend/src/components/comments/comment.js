import React from 'react'
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'
function PostComment({postid}) {
    const initialValues = {
        userid: localStorage.getItem('userid'),
        body: ''
    }
    const validationSchema = Yup.object({
        body: Yup.string().required('This field is required..')
    })

   
    const onSubmit = (values, onSubmitProps) =>{
         axios.post(`http://localhost:8080/posts/${postid}/comment/add`,values)
         .then(res => {      
             console.log(res.data)
         })
         .catch(err => console.log(err))
        onSubmitProps.resetForm()
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });



    return (
        <div>
            <div className ="container" style ={{borderTop:"1px solid white", padding: "15px 0"}}>
            <form onSubmit = {formik.handleSubmit}>
                    <label htmlFor="comment">Add a comment: </label>
                    <input type="text" className = "form-control comment-input" name = "body" id = "body"
                    value = {formik.values.body} 
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    />
                    {formik.errors.body && formik.touched.body ? <div ><p style = {{color: 'crimson'}}>{formik.errors.body}</p></div> : null}
                    <div className="comment-btn text-right" style = {{marginTop:"8px"}}>
                        <button className = "btn btn-danger" type = 'submit'>Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostComment
