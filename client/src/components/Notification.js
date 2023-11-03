import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './Notification.css';

function Notification({favoriteGameId, title}) {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    
    if (favoriteGameId) {
      const eventSource = new EventSource(`http://localhost:5555/stream/${favoriteGameId}/reviews`);
      eventSource.onmessage = (message) => {
        console.log(message)
        setNotificationCount(prevCount => prevCount + 1);
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
  };

  return (
    <div className="noti-div">
      <h2 className="noti-count">Updates in {title}: {notificationCount}</h2>
      <Button className="noti-button" onClick={clearNotifications}>Clear Notifications</Button>
    </div>
  );
}

export default Notification;
