import React, {useState} from 'react'
import '../components/editor-components/editor.css'
import 'bootstrap/dist/css/bootstrap.min.css'
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
    const [theme, setTheme] = useState('vs-dark')
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('vs-dark')
        } else {
            setTheme('light')
        }
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
                        height="80.6vh"
                        defaultLanguage="html"
                        defaultValue={html}
                        onChange={value=> {
                            setHtml(value)
                        }}
                        />
                        </TabPanel>
                        <TabPanel>
                        <Editor
                        height="80.6vh"
                        defaultLanguage="css"
                        defaultValue={css}
                        onChange={value=> {
                            setCss(value)
                        }}
                        />
                        </TabPanel>
                        <TabPanel>
                        <Editor
                        height="80.6vh"
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
                                <div className="row">
                                    <div className="col video-section">
                                        <VideoSection />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col output-section">
                                        <OutputSection htmlCode = {html} cssCode = {"<style>"+css+"</style>"} jsCode = {"<script>"+js+"</script>"}/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    
            <Footer />
        </div>
    )
}

export default EditorPage
