import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./ReviewForm.css";

const ReviewForm = ({ gameId, onReviewSubmit, user, initialReview }) => {
  const [content, setContent] = useState(initialReview ? initialReview.content : "");
  const [rating, setRating] = useState(initialReview ? initialReview.rating : "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("Please log in to post a review.");
      return;
    }
    if (!content.trim() || !rating) {
      setErrorMessage("Review and Rating are required.");
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
      .catch((error) => {
        if (error.message === 'Validation Error') {
          setErrorMessage("Review content must be at least 30 characters long.");
        } else {
          setErrorMessage("Review content must be at least 30 characters long.");
        }
      });
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
      .catch((error) => {
        if (error.message === 'Validation Error') {
          setErrorMessage("Review content must be at least 30 characters long.");
        } else {
          setErrorMessage("Review content must be at least 30 characters long.");
        }
      });
  };

  return (
    <div className="review-form-div">
      <h1 className="review-form-title">{initialReview ? "Edit Review!" : "Add a Review!"}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="rating" className="form-rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control className="rating-control" as="select" value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
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
