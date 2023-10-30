import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./ReviewForm.css";

const ReviewForm = ({ gameId, onReviewSubmit, user, initialReview }) => {
  const [content, setContent] = useState(initialReview ? initialReview.content : "");
  const [rating, setRating] = useState(initialReview ? initialReview.rating : "");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setShowError(true);
      return;
    }

    const integerGameId = parseInt(gameId, 10);
    const integerUserId = parseInt(user.id, 10);

    const reviewData = {
      content,
      rating,
      user_id: integerUserId,
      game_id: integerGameId,
    };

    if (initialReview) {
      reviewData.reviewId = initialReview.id;
      handleUpdateReview(reviewData);
    } else {
      handleCreateReview(reviewData);
    }
  };

  const handleCreateReview = (reviewData) => {
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        onReviewSubmit(data);
        setContent("");
        setRating("");
        window.location.reload();
      })
      .catch((error) => console.error("Error creating review:", error));
  };

  const handleUpdateReview = (reviewData) => {
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
        onReviewSubmit(updatedReview);
        setContent("");
        setRating("");
        window.location.reload();
      })
      .catch((error) => console.error("Error updating review:", error));
  };

  return (
    <div className="review-form-div">
      <h1 className="review-form-title">{initialReview ? "Edit Review" : "Add a Review"}</h1>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="review-form-button" variant="primary" type="submit">
          {initialReview ? "Update Review" : "Submit Review"}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
