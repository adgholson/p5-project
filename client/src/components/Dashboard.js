import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import VideoBackground from "./VideoBackground";
import Notification from "./Notification";
import ReviewForm from "./ReviewForm";
import './Dashboard.css';
import { useUser } from "./UserContext";
import LoadingPage from "./LoadingPage";

const Dashboard = () => {
  const { user, logout, isLoggedIn } = useUser();
  const [userReviews, setUserReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [favoriteGame, setFavoriteGame] = useState();

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}/favorites`)
        .then((response) => response.json())
        .then((data) => {
          const favoriteGame = data.favorite_games[0];
          if (favoriteGame) {
            setFavoriteGame(favoriteGame);
          }
        })
        .catch((error) => console.error("Error fetching favorite game:", error));

      fetch(`/reviews/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserReviews(data.reviews))
        .catch((error) => console.error("Error fetching user reviews:", error));
    }
  }, [userReviews, user]);

  const handleDeleteReview = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        setUserReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      } else {
        console.error("Error deleting review");
      }
    })
    .catch((error) => console.error("Error deleting review:", error));
  };

  const handleReviewSubmit = (reviewData) => {
    if (reviewData.reviewId) {
      fetch(`/reviews/${reviewData.reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: reviewData.content,
          rating: reviewData.rating,
        }),
      })
        .then((response) => response.json())
        .then((updatedReview) => {
          setUserReviews((prevReviews) =>
            prevReviews.map((review) =>
              review.id === updatedReview.id ? updatedReview : review
            )
          );
          setSelectedReview(null);
  
          fetch(`/reviews/user/${user.id}`)
            .then((response) => response.json())
            .then((data) => setUserReviews(data.reviews))
            .catch((error) =>
              console.error("Error fetching updated user reviews:", error)
            );
        })
        .catch((error) => console.error("Error updating review:", error));
    }
  };

  if (!user) {
    return <LoadingPage/>;
  }

  return (
    <div className="dash-container">
      <VideoBackground />
      <div className="black-overlay-dash">
        <h1 className="dash-title">Welcome, {user.username}!</h1>
        <h1 className="dash-header">Thank you for joining the community!</h1>
        {isLoggedIn && <Button className="dash-logout-button" onClick={logout}>Logout</Button>}
      </div>
      <div className="black-overlay-favs">
        <h1 className="dash-title-favs">My Favorite Game!</h1>
        <h3 className="fav-game-title">{favoriteGame?.title}</h3>
      </div>
      <div className="black-overlay-noti">
        <h1 className="dash-title-noti">Notifications!</h1>
        <Notification favoriteGameId={favoriteGame?.id} title={favoriteGame?.title}/>
      </div>
      <div className="black-overlay2">
      {userReviews && userReviews.length > 0 ? (
        <ul className="dash-review-list">
          <h1 className="dash-review-list-title">My Reviews!</h1>
          {userReviews.map((review) => (
            <li key={review.id} className="review-ids">
              <strong className="dash-review-number">Review ID: {review.id}</strong> {review.content} <strong className="dash-review-ratings">Rating:</strong> {review.rating}
              <Button className="review-edit-button" onClick={() => setSelectedReview(review)}>Edit</Button>
              <Button className="review-delete-button" onClick={() => handleDeleteReview(review.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="dash-review-list-title-none">No Reviews Yet!</h1>
      )}
      </div>
      <div className="dash-review-form">
        {selectedReview !== null && (
          <ReviewForm
            onReviewSubmit={handleReviewSubmit}
            user={user}
            initialReview={selectedReview}
            onHideForm={() => setSelectedReview(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
