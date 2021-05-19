import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './contact-us.css'
import {Container,Row, Col, Form, Button} from 'react-bootstrap'

function ContactUs() {
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
                <Form.Control type = "text" placeholder = "Enter Your Name"/>
            </div>
            <div className = "contact-section-divider">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type = "email" placeholder = "youremail@example.com"/>
            </div>
            <div className = "contact-section-divider">
                <Form.Control as = "textarea" rows = {5} placeholder = "Enter your feedback"></Form.Control>
            </div>
            <div className = "contact-btn">
                <Button variant = "warning">Submit</Button>
            </div>
            
            </Form>
            </Col>
           
            
      
            </Row>
         
        </Container>
    )
}

export default ContactUs
