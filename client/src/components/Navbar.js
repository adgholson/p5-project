import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { Button } from "react-bootstrap";

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img className="navbar-logo" src="..\LDLogoBang_NoWhite.png" alt="Logo" />
                <span className="navbar-title">GameSpark</span>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="navlink">Home</Link>
                    </li>
                </ul>
                {isLoggedIn ? (
                    <Link to="/dashboard">
                        <Button className="login-button">Account</Button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <Button className="login-button">Login</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;