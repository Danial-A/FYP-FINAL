
import React, {useRef} from 'react'
import YouTube from 'react-youtube'
import './editor.css'

function VideoSection({video}) {

    const videoRef = useRef()
    const handleScreenshot = () =>{
        console.log(videoRef.current.target?.getCurrentTime())
    }

    const opts = {
        
        width:"100%",
        height:"360",
    }

    const handlePause = (event) =>{
        console.log(event.target?.getCurrentTime())
    }

    return (
       <>
       
       <div className = "video-iframe">
       <button className = "btn btn-danger screenshot-btn" onClick = {()=> handleScreenshot() }>Take Screenshot</button>
       {video === undefined ? <h3>Select a youtube video to play here</h3> : <YouTube videoId = {video} opts = {opts} onPause ={(event)=> handlePause(event)} ref = {videoRef}/>
    }
   </div>
       </>
    )
}

export default VideoSection


/*<iframe 
    src={`https://www.youtube.com/embed/${video}`}
    style = {{border:'1px solid white', width :"100%",height:'100%'}}
    allowFullScreen>
</iframe>*/