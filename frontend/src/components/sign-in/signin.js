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
import {toast } from 'react-toastify'

function SignIn() {
    toast.configure()
    const history = useHistory();
    const signedIn = (message) =>{
        
            toast.success(message, {
                position:"top-center",
                autoClose:2000,
                hideProgressBar:true,
                pauseOnHover:true,
                closeOnClick:true
            })
        
    }

    const wrongCredentials = (message)=>{
        toast.error(message, {
            position:"top-center",
            autoClose:2000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }


    const [loggedIn, setLoggedIn] = useState(false)
    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = async (values, onSubmitProps) => {
        try{
            const response = await axios.post('http://localhost:8080/users/login', values)
            if (response.status === 200) {
              
                const storage = localStorage;
                signedIn(response.data.message)
                setLoggedIn(true)
                storage.setItem('userid', response.data.userid)
                storage.setItem("token", response.data.token)
                storage.setItem("username", response.data.username)
                onSubmitProps.resetForm()
                history.push('/home')
            }
           
        }catch(err){
            wrongCredentials("Invalid credentials")
            onSubmitProps.resetForm()
            console.log(err)
        }
       
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
                                    <Button variant="primary" type="submit">Log In</Button>
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
