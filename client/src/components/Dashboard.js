import React from "react";
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";
import VideoBackground from "./VideoBackground";
import './Dashboard.css';

const Dashboard = ({ user, setIsLoggedIn, setUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    history.push("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-container">
        <VideoBackground />
        <div className="black-overlay-dash">
            <h1 className="dash-title">Welcome, {user.username}!</h1>
            <h1 className="dash-header">Thank you for joining the commmunity!</h1>
            <Button className="dash-logout-button" onClick={handleLogout}>Logout</Button>
        </div>
        <div className="black-overlay2">
            <h1 className="dash-info-title">Account Info</h1>
            <ul className="dash-info-list">
              <li>Email: {user.email}</li>
              <li>Username: {user.username}</li>
            </ul>
        </div>
    </div>
);
}

export default Dashboard;
