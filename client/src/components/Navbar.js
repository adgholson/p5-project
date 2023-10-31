import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { Button } from "react-bootstrap";
import { useUser } from "./UserContext";

const Navbar = () => {
    const {isLoggedIn} = useUser();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img className="navbar-logo" src="..\LDLogoBang_NoWhite.png" alt="Logo" />
                <span className="navbar-title">LegendDairy</span>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="navlink">Home</Link>
                    </li>
                    <li>
                        <Link to="/community" className="navlink">Community</Link>
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