import React, {useRef} from 'react'
import YouTube from 'react-youtube'

function VideoSection({video}) {

    const videoRef = useRef(null)
    return (
       <>
       
       <div className = "video-iframe">
       {video === undefined ? <h3>Select a youtube video to play here</h3> : <object data = {`https://www.youtube.com/embed/${video}`}></object>
    }
   </div>
       </>
    )
}

export default VideoSection


