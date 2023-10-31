import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Footer.css';

const Footer = () => {
    return (
        <nav className="footer">
            <div className="footer-left">
                <img className="footer-logo" src="..\LDLogoBang_NoWhite.png" alt="Logo" />
                <span className="footer-title">Created By Aaron Gholson</span>
            </div>
            <div className="footer-right">
                <ul className="footer-links">
                    <a href="https://www.youtube.com/channel/UCaYBxVkAgdgjb06GvErd3NQ" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-youtube"></i>
                    </a>
                    <a href="https://twitter.com/LegendDairyProd" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/legenddairyprod/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                    </a>
                    <a href="https://www.tiktok.com/@legenddairyprod" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-tiktok"></i>
                    </a>
                    <a href="https://www.reddit.com/user/LegendDairyProd" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-reddit"></i>
                    </a>
                    <div className="footer-divider"></div>
                    <div className="footer-right-div">
                        <a href="https://github.com/adgholson" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/adgholson/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin"></i>
                        </a>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Footer;
