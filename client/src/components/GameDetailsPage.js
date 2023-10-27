import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import { Card } from "react-bootstrap";
import "./GameDetailsPage.css";
import ReviewForm from "./ReviewForm";

const GameDetailsPage = ({ games, user }) => {
  const { gameId } = useParams();
  const game = games.find((game) => game.id === parseInt(gameId, 10));
  const [reviews, setReviews] = useState(game.reviews || []);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  if (!game) {
    return <div>Game not found</div>;
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
          </div>
            <div className="reviews-list">
            <h2 className="reviews-title">Reviews!</h2>
            {reviews.map((review) => (
              <div key={review.id}>
                <strong>{review.user.username}</strong>: {review.content} (Rating: {review.rating})
              </div>
            ))}
          </div>
            </div>
        </div>

  );
};

export default GameDetailsPage;
