import React from "react";
import { useParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import { Card } from "react-bootstrap";
import "./GameDetailsPage.css";

const GameDetailsPage = ({ games }) => {
  const { gameId } = useParams();
  const game = games.find((game) => game.id === parseInt(gameId, 10));

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="game-page">
        <VideoBackground />
        <div className="game-container">
            <div>
            <Card className="game-card">
                <Card.Img variant="top" src={game.cover_image} alt={game.title} />
                <Card.Body className="card-body">
                <Card.Title className="game-title">{game.title}</Card.Title>
                <Card.Text>Description: {game.description}</Card.Text>
                <Card.Text>Release Date: {game.release_date}</Card.Text>
                <Card.Text>Platforms: {game.platforms}</Card.Text>
                </Card.Body>
            </Card>
            </div>
        </div>
    </div>
  );
};

export default GameDetailsPage;
