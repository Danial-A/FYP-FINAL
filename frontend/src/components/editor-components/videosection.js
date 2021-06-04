import React, {useRef} from 'react'
import YouTube from 'react-youtube'

function VideoSection({video}) {

    const videoRef = useRef(null)
    return (
       <>
       
       <div className = "video-iframe">
       {video === undefined ? <h3>Select a youtube video to play here</h3> : <iframe
        src={`https://www.youtube.com/embed/${video}`}
        style = {{border:'1px solid white', width :"100%",height:'100%'}}
        allowFullScreen>
    </iframe>}
   </div>
       </>
    )
}

export default VideoSection


