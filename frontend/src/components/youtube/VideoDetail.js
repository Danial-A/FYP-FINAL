import React from "react";
import {Link } from 'react-router-dom'
import './style/video.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
       <h4 style = {{color:"white"}}>Enter search keyword to load...</h4>
       <br></br>
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" className = "video-frame"/>
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p className = "description">{video.snippet.description}</p>
        <Link className = "btn btn-danger coding" to = {`/playground/${video.id.videoId}`}>Start Coding?</Link>
      </div>
    </div>
  );
};

export default VideoDetail;
