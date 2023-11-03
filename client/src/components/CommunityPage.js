import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import GameDetailsPage from "./GameDetailsPage";
import VideoBackground from "./VideoBackground";
import "./CommunityPage.css";
import LoadingPage from "./LoadingPage";

function CommunityPage( {games} ) {
  const match = useRouteMatch("/gamedetails/:gameId");
  const specificGameId = match ? match.params.gameId : null;

  if (!games || games.length === 0) {
    return <LoadingPage/>
  }

  return (
    <div className="community-page">
      <VideoBackground />
      <div className="community-container">
        <Row>
          {games.map((game) => (
            <Col key={game.id} md={3} lg={3}>
              <Link to={`/gamedetails/${game.id}`} className="game-link">
                <Card className={`game-cards ${specificGameId && game.id.toString() === specificGameId ? 'selected' : ''}`}>
                  <Card.Img variant="top" src={game.cover_image} alt={game.title} />
                  <Card.Body className="card-bodys">
                    <Card.Title className="game-titles">{game.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      <Switch>
        <Route path="/gamedetails/:gameId">
          <GameDetailsPage games={games} />
        </Route>
      </Switch>
    </div>
  );
}

export default CommunityPage;
