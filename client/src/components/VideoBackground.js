import React from "react";
import './VideoBackground.css';

function VideoBackground() {
    return (
        <div className="video-background">
            <video className="background-video" autoPlay loop muted>
                <source src="../paris.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoBackground;
