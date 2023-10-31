import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import { Card, Button } from "react-bootstrap";
import "./GameDetailsPage.css";
import ReviewForm from "./ReviewForm";
import { useUser } from "./UserContext";

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const { user } = useUser();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch(`/games/${gameId}`)
      .then(response => response.json())
      .then(data => {
        setGame(data);
      })
      .catch(error => {
        console.error("Error fetching game details:", error);
      });

    fetch(`/reviews/game/${gameId}`)
      .then(response => response.json())
      .then(data => {
        Promise.all(data.reviews.map(review => 
          fetch(`/users/${review.user_id}`)
            .then(response => response.json())
            .then(userData => ({ ...review, username: userData.username }))
        ))
        .then(reviewsWithUsernames => {
          setReviews(reviewsWithUsernames);
        })
        .catch(error => {
          console.error("Error fetching usernames for reviews:", error);
        });
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }, [gameId]);

  const handleFavoriteClick = () => {
    if (!user) {
      setErrorMessage("Please log in to mark this game as your favorite.");
      return;
    }
    fetch(`/users/${user.id}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game_id: gameId,
      }),
    })
      .then(response => {
        if (response.ok) {
          setSuccessMessage("This game has been marked as your favorite!");
        } else {
          setErrorMessage("Error setting favorite game.");
        }
      })
      .catch(error => {
        console.error("Error setting favorite game:", error);
        setErrorMessage("Error setting favorite game.");
      });
  };

  const handleReviewSubmit = newReview => {
    setReviews([...reviews, newReview]);
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-page">
      <VideoBackground />
      <div className="game-container">
        <div className="content-container">
          <Card className="game-card">
            <Card.Img variant="top" src={game.cover_image} alt={game.title} />
            <Card.Body className="card-body">
              <Card.Title className="game-title">{game.title}</Card.Title>
              <Card.Text>Description: {game.description}</Card.Text>
              <Card.Text>Release Date: {game.release_date}</Card.Text>
              <Card.Text>Platforms: {game.platforms}</Card.Text>
            </Card.Body>
          </Card>
          <ReviewForm gameId={gameId} user={user} onReviewSubmit={handleReviewSubmit} />
          <div className="overlay-favs">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && successMessage !== false && <p className="success-message"><strong>Success:</strong> {successMessage}</p>}
            <Button id="fav-button" onClick={handleFavoriteClick}>Make this game my Favorite!</Button>
          </div>
        </div>
        <div className="reviews-list">
          <h2 className="reviews-title">Reviews!</h2>
          {reviews.map(review => (
            <div key={review.id} className="review-ids">
              <strong className="review-usernames">{review?.username || "Anonymous User"}:</strong> {review.content} <strong className="review-ratings">Rating:</strong> {review.rating}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
