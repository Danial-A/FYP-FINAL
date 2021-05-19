import React from 'react';
import './HeroSection.css';
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const HeroSection = () =>{
  return(
    <div>
      <Container className = "background">
          <Row>
            <Col md = {6} className = "description-section">
              <h1>EduNetwork, the place to be!</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vitae suscipit ipsum doloremque, ratione fuga exercitationem dignissimos mollitia, sit dolor veniam quia repudiandae officia adipisci blanditiis? Nobis quo rem totam.</p>
              <button className = "startButton"> <Link to = "/users/sign-up">Get Started!</Link></button>
            </Col>
            <Col md = {6} className = "display-image">
              <img src="images/own.svg" alt=""/>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default HeroSection;