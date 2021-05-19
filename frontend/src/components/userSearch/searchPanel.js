import React, { useState } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import UserSearch from '../user-search-component/userSearch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './searchPanel.css'
function SearchPanel() {
    const uid = localStorage.getItem('userid')
    //search modal
    const [searchShow, setSearchShow] = useState(false);
    const handleSearchClose = () => setSearchShow(false);
    const handleSearchShow = () => setSearchShow(true);

    //group modal
    const [groupShow, setGroupShow] = useState(false);
    const handleGroupClose = () => setGroupShow(false);
    const handleGroupShow = () => setGroupShow(true);

    //Group form validation 
    const initialValues = {
        title: '',
        description: ''
    }
    const onSubmit = (values, onSubmitProps) => {
        try {
            const response = axios.post(`http://localhost:8080/groups/create/${uid}`, values)
            response.then(res => console.log(res))
                .catch(err => console.log())
        } catch (err) {
            console.log(err)
        }
        // axios.post(`http://localhost:8080/groups/create/${uid}`,values)
        // .then(response=> console.log(response))
        // .catch(err=> console.log(err))
        // onSubmitProps.resetForm()
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required."),
        description: Yup.string().required("Description is required.")
    })
    const formik = useFormik({
        initialValues, onSubmit, validationSchema
    })

    return (
        <>
            <div className="container-fluid " style={{ color: "white" }}>
   




                <Card style={{ width: '18rem' }}>
                   
                    <Card.Body>
                    <Card.Title style={{ color: 'black' }}>User Search</Card.Title>
                        <Card.Link className="cols" onClick={handleSearchShow} href="#">User Search</Card.Link>
                        <Card.Link  className="cols" onClick={handleGroupShow} href="#">Create New Group?</Card.Link>
                    </Card.Body>
                </Card>



                <Modal show={searchShow} onHide={handleSearchClose} backdrop="static" keyboard={false} >
                        <Modal.Body>
                            <UserSearch />
                           
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={handleSearchClose}>Close</Button>
                            </Modal.Footer>
                    </Modal>


                    <Modal show={groupShow} onHide={handleGroupClose} animation={true} keyboard={false} backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title style={{ color: "crimson" }}>Create new group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={formik.handleSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Title:</label>
                                    <input type="text" class="form-control" name="title"
                                        placeholder="Title.." value={formik.values.title}
                                        onBlur={formik.onBlur}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.title && formik.touched.title ? <div style={{ paddingTop: "10px" }}><p style={{ color: 'crimson' }}>{formik.errors.title}</p></div> : null}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Description</label>
                                    <textarea rows="6" type="text" class="form-control"
                                        placeholder="Enter group description i.e what the group is about"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.onBlur}
                                    />
                                    {formik.errors.description && formik.touched.description ? <div style={{ paddingTop: "10px" }}><p style={{ color: 'crimson' }}>{formik.errors.description}</p></div> : null}
                                </div>
                                <small id="emailHelp" class="form-text text-muted">Adding/Removing users will be available once the group is created</small>
                                <Button variant="danger" className="mt-2" type="submit">
                                    Create
                    </Button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleGroupClose}>
                                Close
                </Button>

                        </Modal.Footer>
                    </Modal>
            </div>

        </>
    )
}

export default SearchPanel

