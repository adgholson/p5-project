import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './Notification.css';
import { Link } from "react-router-dom";

function Notification({ favoriteGameId, title }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    if (favoriteGameId) {
      const eventSource = new EventSource(`http://localhost:5555/stream/${favoriteGameId}/reviews`);
      eventSource.onmessage = (message) => {
        const newNotification = "A new review was posted!";
        setNotificationCount(prevCount => prevCount + 1);
        setNotificationMessages(prevMessages => [...prevMessages, newNotification]);
      };

      eventSource.onerror = (error) => {
        console.error('Error occurred:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [favoriteGameId]);

  const clearNotifications = () => {
    setNotificationCount(0);
    setNotificationMessages([]);
  };

  return (
    <div className="noti-div">
      <h2 className="noti-header">Updates in {title}: <h3 className="noti-count-h3">{notificationCount}</h3></h2>
      <div className="noti-list">
        {notificationMessages.map((message, index) => (
          <Link to={`/gamedetails/${favoriteGameId}`} className="notilink"><div key={index} className="noti-message">{message}</div></Link>
        ))}
      </div>
      <Button className="noti-button" onClick={clearNotifications}>Clear Notifications</Button>
    </div>
  );
}

export default Notification;
