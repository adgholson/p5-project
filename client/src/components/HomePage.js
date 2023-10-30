import React from "react";
import './HomePage.css';
import VideoBackground from "./VideoBackground";
import {Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function HomePage() {
    const history = useHistory();
    return (
        <div className="home-center-div">
            <VideoBackground/>
            <div className="black-overlay">
                <h1 className="home-title">Welcome to</h1>
                <img className="home-logo" src="..\LDLogoLong_Shadow.png" alt="Logo" />
                <h1 className="home-title">Productions!</h1>
                <Button className="home-signup-button" onClick={() => history.push('/signup')}>
                Join Our Community!
                </Button>
            </div>
        </div>
    )
}

export default HomePage;