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
                <h1 className="home-title">Welcome to GameSpark!</h1>
                <h3 className="home-header">Welcome to the Heart of Gaming Enthusiasts! Unlock a world of game reviews and vibrant community interactions.</h3>
                <h3 className="home-header">Join our community by signing up, or dive right in by logging in to connect, explore, and share your passion for gaming!</h3>
                <Button className="home-signup-button" onClick={() => history.push('/signup')}>
                SignUp!
                </Button>
            </div>
        </div>
    )
}

export default HomePage;