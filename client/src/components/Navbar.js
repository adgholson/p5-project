import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { Button } from "react-bootstrap";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img className="navbar-logo" src="..\LDLogoBang_NoWhite.png" alt="Logo" />
                <span className="navbar-title">GameSpark</span>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <h3 className="navlink">Page1</h3>
                    </li>
                    <li>
                        <h3 className="navlink">Page2</h3>
                    </li>
                     <li>
                        <h3 className="navlink">Page3</h3>
                    </li>
                </ul>
                <Button className="login-button">Login</Button>
            </div>
        </nav>
    );
};

export default NavBar;
