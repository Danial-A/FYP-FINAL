import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './team.css'
import {Container, Row, Col, Card} from 'react-bootstrap'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faGithub,faInstagram} from '@fortawesome/free-brands-svg-icons'

function TeamSection() {
    return (
        <div className="card-container" style = {{backgroundColor : "#fff"}}>
        <Container  className= "team-container" id = "about">
            <Row>
               
                <Col md ={6} className = "ml-auto card-column">
                    <Card style={{ width: '18rem' }} className = "card-main">
                    <div>
                        <Card.Img variant="top" src="images/danial.jpg" className = "card-image" />
                    </div>
                    <Card.Body>
                    <Card.Title>Danial Ahmad</Card.Title>
                    <Card.Text className = "card-information">
                        <pre>Full Stack Developer</pre>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, aliquam?</p>
                    </Card.Text>
                    <div className="social-links">
                        <Container >
                            <Row className = "center-text">
                                <Col><FontAwesomeIcon icon ={faFacebook} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faGithub} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faTwitter} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faInstagram} size = "2x"/></Col>
                            </Row>
                        </Container>
                    </div>
                    </Card.Body>
                    </Card>                
                </Col>
                <Col md ={6} className = "ml-auto card-column">
                    <Card style={{ width: '18rem' }} className = "card-main">
                    <div>
                        <Card.Img variant="top" src="images/abbasi.jpeg" className = "card-image" />
                    </div>
                    <Card.Body>
                    <Card.Title>Awais Bin Saqib</Card.Title>
                    <Card.Text className = "card-text">
                        <pre>Data Analyst</pre>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, aliquam?</p>
                    </Card.Text>
                    <div className="social-links">
                        <Container >
                            <Row className = "center-text">
                                <Col><FontAwesomeIcon icon ={faFacebook} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faGithub} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faTwitter} size = "2x"/></Col>
                                <Col><FontAwesomeIcon icon ={faInstagram} size = "2x"/></Col>
                            </Row>
                        </Container>
                    </div>
                    </Card.Body>
                    </Card>                
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default TeamSection
