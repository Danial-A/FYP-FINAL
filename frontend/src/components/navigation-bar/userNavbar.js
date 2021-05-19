import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav} from 'react-bootstrap'
import './navbar.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'


function NavigationBar() {
  const handleLogout =  () =>{
    localStorage.clear()
  }
    return (
        <div>
          <Navbar bg="transparent" expand="lg" className  ="navbar-main">
          <Navbar.Brand as = {Link} to = "/home" style = {{ color : "white"}}> <FontAwesomeIcon icon = {faBook} className = "title-icon"/> EduNetwork</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className = "navbar-toggle"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto navbar-links">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/messenger">Messenger</Nav.Link>
              <Nav.Link href="/playground">Playground</Nav.Link>
              <Nav.Link href="/yt/search">Youtube</Nav.Link>
              <Nav.Link href="/sign-in" className = "navbar-signup" onClick = {handleLogout}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </div>
    )
}

export default NavigationBar
