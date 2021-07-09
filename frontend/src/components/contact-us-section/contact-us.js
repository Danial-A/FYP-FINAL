import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './contact-us.css'
import {Container,Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {toast} from 'react-toastify'

function ContactUs() {

    toast.configure()
    const feedback = (response)=>{
        toast.success(response, {
          position:"top-center",
          autoClose:3000,
          hideProgressBar:true,
          pauseOnHover:true,
          closeOnClick:true
      })
      }

    const feedbackError = (message) =>{
        toast.error(message, {
            position:"top-center",
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            closeOnClick:true
        })
    }

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [feedbackBody,setFeedbackBody] = useState('')

    const handleFeedbackSubmit = async () =>{
        if(name === '' || email === '' || feedbackBody === '') return feedbackError("Please fill all fields!")
        else{
            try{
                const res = await axios.post('http://localhost:8080/feedbacks/new', {
                email,name,feedbackBody
                })
                setName('')
                setEmail('')
                setFeedbackBody('')
                feedback(res.data.message)
            }catch(err){
                console.log(err)
            }
        }
    }


    return (
        <Container className = "contact-container" id = "contact">
            <Row>
            <Col lg ={4} className ="contact-desctiption">
            <h1>Contact Us</h1>
            <p style = {{color:'white !important'}}>Contact us in order to get in touch with us to know the latest happenings over at EduNetwork!</p>
            </Col>
            <Col lg= {8}>
            <Form>
            <div className = "contact-section-divider">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type = "text" placeholder = "Enter Your Name" value = {name} onChange = {(e)=> setName(e.target.value)}/>
            </div>
            <div className = "contact-section-divider">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type = "email" placeholder = "youremail@example.com" value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
            </div>
            <div className = "contact-section-divider">
                <Form.Control as = "textarea" rows = {5} placeholder = "Enter your feedback" value = {feedbackBody} onChange = {(e)=> setFeedbackBody(e.target.value)}></Form.Control>
            </div>
            <div className = "contact-btn">
                <Button variant = "warning" onClick = {(e)=>{
                    e.preventDefault()
                    handleFeedbackSubmit()
                }}>Submit</Button>
            </div>
            
            </Form>
            </Col>
           
            
      
            </Row>
         
        </Container>
    )
}

export default ContactUs
