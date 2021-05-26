import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainChatArea from '../components/messenger/mainchat-area' 
import SideChatPanel from '../components/messenger/sidechat-panel' 
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
function Messenger({match}) {
    const uid = localStorage.getItem('userid')
    const [user,setUser] = useState({})
    useEffect(async()=>{
        try{
            const response = await axios.get(`http://localhost:8080/users/${uid}`)
            //console.log(response.data)
            setUser(response.data)
        }catch(err){
            console.log(err)
        }
        

    },[])

    
    const chatid =match.params.id 
    return (
        <div className = "container-fluid ">
        <NavigationBar/>
        <div className="container mt-5" style = {{marginBottom:"6vh"}}>
            <div className="row">
                <div className="col-md-4">
                    <SideChatPanel />
                </div>
                <div className="col-md-8">
                    <MainChatArea chatid= {chatid}/>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}

export default Messenger
