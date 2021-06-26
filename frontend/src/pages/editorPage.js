import React, {useState, useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'
import '../components/editor-components/editor.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from 'react-router-dom'
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
import Editor from "@monaco-editor/react";
import OutputSection from '../components/editor-components/outputsection'
import VideoSection from '../components/editor-components/videosection'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


function EditorPage() {
    const [html,setHtml] = useState('<!-- Write your html here -->')
    const [css,setCss] = useState('/* Write your css here */')
    const [js,setJS] = useState('//Write your javascript here')
    const [tabIndex, setTabIndex] = useState(0);
    const videoRef = useRef(null)



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var {id} = useParams()

    const getScreenShot = async ()=>{
       console.log("Hello jee")
    }


    return (
        <div>
            <NavigationBar />
            <div className="container-fluid" style = {{margin:"5vh 0 8vh 0"}}>
                
                        <div className="row">
                        <div className="col-md-6">
                        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <TabList>
                          <Tab style = {{color:"crimson", fontSize:"20px"}}>HTML</Tab>
                          <Tab style = {{color:"crimson", fontSize:"20px"}}>CSS</Tab>
                          <Tab style = {{color:"crimson", fontSize:"20px"}}>JavaScript</Tab>

                        </TabList>
                    
                        <TabPanel>
                        <Editor
                        height="84vh"
                        defaultLanguage="html"
                        defaultValue={html}
                        onChange={value=> {
                            setHtml(value)
                        }}
                        />
                        </TabPanel>
                        <TabPanel>
                        <Editor
                        height="84vh"
                        defaultLanguage="css"
                        defaultValue={css}
                        onChange={value=> {
                            setCss(value)
                        }}
                        />
                        </TabPanel>
                        <TabPanel>
                        <Editor
                        height="84vh"
                        defaultLanguage="javascript"
                        defaultValue={js}
                        onChange={value=> {
                            setJS(value)
                        }}
                        />
                        </TabPanel>
                      </Tabs>
                        </div>
                            <div className="col-md-6">
                            <button className = "btn btn-danger"
                                onClick = {()=>{
                                    getScreenShot()
                                }}
                            >Take Screenshot</button>
                                <div className="row">
                                    <div className="col video-section" ref = {videoRef} >
                                        <VideoSection video = {id}  />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col output-section" >
                                <OutputSection htmlCode = {html} cssCode = {"<style>"+css+"</style>"} jsCode = {"<script>"+js+"</script>"}/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    
            <Footer />

            <>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              oops
              </Modal.Body>
             
            </Modal>
          </>
        </div>
    )
}

export default EditorPage
