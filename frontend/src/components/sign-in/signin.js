import React, { useState } from 'react'
import './signin.css'
import NavigationBar from '../../components/navigation-bar/navbar'
import Footer from '../../components/footer-section/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


function SignIn() {
    
    
    const [loggedIn, setLoggedIn] = useState(false)
    const initialValues = {
        username: '',
        password: ''
    }

    const history = useHistory();
    function redirectUser() {
        if (loggedIn) {
            history.push('/Home')
        } else return null
    }

    const onSubmit = (values, onSubmitProps) => {
        axios.post('http://localhost:8080/users/login', values)
            .then(res => {
                console.log(res.data.userid)
                if (res.status === 200) {
                    axios.get(`http://localhost:8080/users/${res.data.userid}`)
                        .then(user => console.log(user))
                        .catch(err => console.log(err))
                    const storage = localStorage;
                    storage.setItem('userid', res.data.userid)
                    storage.setItem("token", res.data.token)
                    storage.setItem("username", res.data.username)
                    setLoggedIn(true)
                }
                redirectUser()
            })
            .catch(err => console.log(err))
        onSubmitProps.resetForm()
    }



    const validationSchema = Yup.object({
        password: Yup.string().required('This field is required..'),
        username: Yup.string().required('This field is required..')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="main-body">
            <NavigationBar />
            <Container className="signin-container">
                <Row className="signin-row">
                    <Col sm={6}>
                        <div className="signin-form-section signin">
                            <Form onSubmit={formik.handleSubmit}>
                                <h3 className="text-light text-center">Log into your account!</h3>


                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="text-light">Enter your username:</Form.Label>
                                    <Form.Control type="text"
                                        name="username"
                                        id="username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username} />
                                    {formik.errors.username && formik.touched.username ? <div ><p style={{ color: 'crimson' }}>{formik.errors.username}</p></div> : null}
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="text-light form-label">Enter your password:</Form.Label>
                                    <Form.Control type="password" name="password" id="password" value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlue={formik.handleBlur}

                                    />
                                    {formik.errors.password && formik.touched.password ? <div ><p style={{ color: 'crimson' }}>{formik.errors.password}</p></div> : null}
                                </Form.Group>
                                <Row>
                                    <Col md={6} >
                                        <Form.Group controlId="formBasicCheckbox" >
                                            <Form.Check type="checkbox" label="Remember Me." className="text-light" name="toggle"
                                                onChange={formik.handleChange}
                                                value={formik.values.toggle}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Link style={{ color: 'white', textDecoration: 'none' }}>Forgot password?</Link>

                                    </Col>

                                </Row>


                                <Row className="login-btn">
                                    <Button variant="primary" type="submit" onClick={redirectUser}>Log In</Button>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col sm={6} className="signin">
                        <img src="/images/signin.svg" alt="" />
                    </Col>

                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default SignIn
