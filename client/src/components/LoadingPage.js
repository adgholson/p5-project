import React from "react";
import './LoadingPage.css';

function LoadingPage() {
    return (
        <div className="center-div">
            <div className="loading-overlay">
                <h1 className="loading-title">Loading ...</h1>
            </div>
        </div>
    )
}

export default LoadingPage;