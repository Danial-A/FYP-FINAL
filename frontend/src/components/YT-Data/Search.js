import React from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './yt.css'

function SearchComponent(props) {

    const initialValues = {
        searchtext: ''
    }
    const validationSchema = Yup.object({
        searchtext: Yup.string().required("Please enter some keyword to search..")
    })

    function onSubmit(values){
        props.onSearch(values.searchtext)
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div className = "container main-container">
            <form onSubmit = {formik.handleSubmit}>
                <h3 className = "heading">Enter Search Keyword</h3>
                <div className="input-group mb-3">
                    <input 
                    id = 'searchtext'
                    name = "searchtext"
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    value = {formik.values.searchtext}
                    type="text" className="form-control" 
                    placeholder="Search..." 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    />
                    {formik.errors.searchtext && formik.touched.searchtext ? <div ><p style = {{color: 'crimson'}}>{formik.errors.searchtext}</p></div> : null}
                <div className="input-group-prepend">
                <button type = "submit" className = "button-search">Search</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default SearchComponent


// {<span className="input-group-text bg-warning" id="basic-addon1">Search</span>}