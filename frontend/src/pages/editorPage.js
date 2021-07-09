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
import axios from 'axios'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';


function EditorPage() {
    const [html,setHtml] = useState('<!-- Write your html here -->')
    const [css,setCss] = useState('/* Write your css here */')
    const [js,setJS] = useState('//Write your javascript here')
    const [tabIndex, setTabIndex] = useState(0);
    const videoRef = useRef(null)
    const [image, setImage] = useState()
    const [crop,setCrop] = useState({
        aspect: 16/9
    })
    const [croppedImage, setCroppedImage] = useState('')

    const ArrayBufferToBase64 =  (buffer)=> {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for (var len = bytes.byteLength, i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var {id} = useParams()
    console.log(id)
    const getScreenShot = async ()=>{
       try{
        const res = await axios.get(`http://localhost:8080/users/get/screenshot/${id}`)
        const img = await axios.get(res.data.image, {
            responseType:"arraybuffer"
        })
     
       const img64 = await ArrayBufferToBase64(img.data)
       await setImage(`data:image/png;base64,${img64}`)
       handleShow()
        
       }
       catch(err){
           console.log(err)
       }
    }

    const handleOnCropChange = (crop) =>{
        // console.log(image)
        setCrop(crop)
        
    }

    function getCroppedImg() {
      const setimage = new Image();
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        console.log(scaleX, scaleY)
      
       
        setimage.onload = function() {
          ctx.drawImage(
            setImage,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
          );
        }
        setimage.src = image
        // ctx.drawImage(
        //   image,
        //   crop.x * scaleX,
        //   crop.y * scaleY,
        //   crop.width * scaleX,
        //   crop.height * scaleY,
        //   0,
        //   0,
        //   crop.width,
        //   crop.height,
        // );
      
       const base64Image = canvas.toDataURL('image/jpeg');
       setCroppedImage(base64Image)
       //console.log(croppedImage)
      }
      const getText = () =>{
        var options = {
          method: 'POST',
          url: 'https://microsoft-computer-vision3.p.rapidapi.com/ocr',
          params: {detectOrientation: 'true', language: 'unk'},
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': 'dab1da0aafmsh229eab3ebe61f7dp176896jsne68cb27b9eb3',
            'x-rapidapi-host': 'microsoft-computer-vision3.p.rapidapi.com'
          },
          data: {
            url: 'https://henryegloff.com/media/How-to-Code-a-Basic-Webpage-Using-HTML-Tutorial-2.jpg'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data)
        }).catch(function (error) {
            console.error(error);
        });
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
                                    getScreenShot(id)

                                }}
                            >Take Screenshot</button>
                            <button className = "btn btn-danger" onClick = {()=> getText()}>
                                Get Text
                            </button>
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
              <div>
                <ReactCrop src ={image} crop = {crop} onChange = {handleOnCropChange}/>
                <button className = "btn btn-danger" onClick = {()=> getCroppedImg()}> Crop Image</button>
                <img src= {croppedImage === undefined ? "" : croppedImage} alt="" />
              </div>
               
              </Modal.Body>
             
            </Modal>
          </>
        </div>
    )
}

export default EditorPage
