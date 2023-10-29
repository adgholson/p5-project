import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./ReviewForm.css";

const ReviewForm = ({ gameId, onReviewSubmit, user }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [showError, setShowError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setShowError(true);
      return;
    }

  const integerGameId = parseInt(gameId, 10);
  const integerUserId = parseInt(user.id, 10);

    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        rating,
        user_id: integerUserId,
        game_id: integerGameId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onReviewSubmit(data);
        setContent("");
        setRating("");
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="review-form-div">
    <h1 className="review-form-title">Add a Review!</h1>
    {showError && <Alert variant="danger" className="review-form-error"><strong>Error:</strong> You must be logged in to post a review.</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="rating" className="form-rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control className="rating-control" as="select" value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))} required>
        <option value="">Select a Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Form.Control>
      </Form.Group>
      <Button className="review-form-button" variant="primary" type="submit">
        Submit Review
      </Button>
    </Form>
    </div>
  );
};

export default ReviewForm;
