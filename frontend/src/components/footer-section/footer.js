import React from 'react'
import './footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function Footer() {
    return (
        <div style = {{backgroundColor:"white"}}>
            <footer className = "footer-section">
           <p> &copy; {new Date().getFullYear()} Copyright: <a href="/"> EduNetwork.com </a></p>
            </footer>
        </div>
    )
}

export default Footer
