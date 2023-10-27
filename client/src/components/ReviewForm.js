import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./ReviewForm.css";

const ReviewForm = ({ gameId, onReviewSubmit, user }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        rating,
        user_id: user.id,
        game_id: gameId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onReviewSubmit(data);
        setContent("");
        setRating(1);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="review-form-div">
    <h1 className="review-form-title">Add a Review!</h1>
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
        <Form.Control className="rating-control" as="select" value={rating} onChange={(e) => setRating(e.target.value)} required>
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
