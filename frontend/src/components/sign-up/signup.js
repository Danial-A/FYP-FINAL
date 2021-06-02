import React, { useState } from 'react'
import './signup.css'
import { useHistory } from 'react-router-dom'
import NavigationBar from '../../components/navigation-bar/navbar'
import Footer from '../../components/footer-section/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './signup.css'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function SignUp(props) {
    //Toast setting
    toast.configure()
    const signedUp = (message) => {
        toast.success(message, {
        });
    }

    const [redirect, setRedirect] = useState(false)

    const initialValues = {
        firstname: '',
        lastname: '',
        emailid: '',
        username: '',
        password: '',
        dob: '',
        profileImage:'/images/Dp.svg'
       

    }
    const onSubmit = (values, onSubmitProps) => {
        // setRedirect(true);
        axios.post('http://localhost:8080/users/register', values)
            .then((res) => {
                signedUp(res.data)
            })
            .catch(err => { console.log('Error: ' + err) });
        onSubmitProps.resetForm()

    }
    let history = useHistory();
    function redirectUser() {
        if (redirect) {
            history.push('/sign-in');
        }
    }

    const validationSchema = Yup.object({
        firstname: Yup.string().required('This field is required..'),
        lastname: Yup.string().required('This field is required..'),
        emailid: Yup.string().email('Enter a valid email address..').required('This field is required..'),
        username: Yup.string().required('This field is required..'),
        password: Yup.string().required('This field is required..'),
        dob: Yup.string().required('This field is required..'),
        // confirmpassword: Yup.string().required('This field is required..').when("password", {
        //     is:val => (val && val.length > 0 ? true : false),
        //     then : Yup.string().oneOf([Yup.ref("password")], "Value must match the entered password..")
        // })
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div className="main-body">
            <NavigationBar />
            <div className="container signin-container">
                <div className="row signin-row">
                    <div className="col-sm-8" style={{ padding: '0' }}>
                        <div className="signup-form-section signup">
                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="text-light text-center">
                                    Sign Up For Your Account!
                                    </h3>
                                <div className="row section-divider">

                                    <div className="col-lg-6 ">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light">First Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                className="form-controller"
                                                placeholder="Enter first name.."
                                                onChange={formik.handleChange}
                                                value={formik.values.firstname}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.firstname && formik.touched.firstname ? <div className="error"><p>{formik.errors.firstname}</p></div> : null}
                                        </Form.Group>
                                    </div>

                                    <div className="col-lg-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light">Last Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                placeholder="Enter last name.."
                                                className="form-controller"
                                                onChange={formik.handleChange}
                                                value={formik.values.lastname}
                                                onBlur={formik.handleBlur}

                                            />
                                            {formik.errors.lastname && formik.touched.lastname ? <div className="error"><p>{formik.errors.lastname}</p></div> : null}
                                        </Form.Group>
                                    </div>


                                </div>



                                <div className="row section-divider">



                                    <div className="col-lg-6 ">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light">Email ID:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="emailid"
                                                id="emailid"
                                                placeholder="yourname@example.com"
                                                className="form-controller"
                                                onChange={formik.handleChange}
                                                value={formik.values.emailid}
                                                onBlur={formik.handleBlur}
                                            />
                                              {formik.errors.emailid && formik.touched.emailid ? <div className="error"><p>{formik.errors.emailid}</p></div> : null}
                                        </Form.Group>
                                    </div>






                                    <div className="col-lg-6 ">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light">Username:</Form.Label>
                                            <Form.Control
                                              type="text" name="username" id="username" placeholder="example123" className="form-controller"
                                              onChange={formik.handleChange}
                                              value={formik.values.username}
                                              onBlur={formik.handleBlur}
                                            />
                                              {formik.errors.username && formik.touched.username ? <div className="error"><p>{formik.errors.username}</p></div> : null}
                                        </Form.Group>
                                    </div>
                                </div>



                                <div className="row section-divider">


                                    <div className="col-lg-6 ">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light">Enter Password:</Form.Label>
                                            <Form.Control
                                             type="password" name="password" id="password" className="form-controller"
                                             onChange={formik.handleChange}
                                             value={formik.values.password}
                                             onBlur={formik.handleBlur}
                                            />
                                             {formik.errors.password && formik.touched.password ? <div className="error"><p>{formik.errors.password}</p></div> : null}
                                        </Form.Group>
                                    </div>







                                    <div className="col-lg-6 ">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="text-light dob">First Name:</Form.Label>
                                            <Form.Control
                                              type="date" name="dob" id="dob" className="form-controller"
                                              onChange={formik.handleChange}
                                              value={formik.values.dob}
                                              onBlur={formik.handleBlur}
                                            />
                                             {formik.errors.dob && formik.touched.dob ? <div className="error"><p>{formik.errors.dob}</p></div> : null}
                                        </Form.Group>
                                    </div>                    
                                </div>



                                <div className="login-btn">
                                    <button type="submit" className="btn btn-danger" onClick={redirectUser()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4 signup">
                        <img src="/images/signup.svg" alt="sign in" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp