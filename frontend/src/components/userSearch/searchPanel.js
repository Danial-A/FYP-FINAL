import React, { useState } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import UserSearch from '../user-search-component/userSearch'
import GroupSearchComponent from '../group-search/group-search-component'
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
                        <Card.Link  className="cols" onClick={handleGroupShow} href="#">Search for groups?</Card.Link>
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
                    <Modal.Body>
                    <GroupSearchComponent />
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={handleGroupClose}>Close</Button>
                    </Modal.Footer>
                    </Modal>
            </div>

        </>
    )
}

export default SearchPanel

