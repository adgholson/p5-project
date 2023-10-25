import React, { useState } from "react";
import './SignUp.css';
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here (e.g., API call to authenticate user)
    // Use formData.username and formData.password to send user credentials
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <h1 className="signup-form-title">signup</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            signup
          </Button>
        </Form>
        <h2 className="signup-form-account-text">Have an account?</h2>
        <h2 className="signup-form-login-text">Login!</h2>
      </div>
    </div>
  );
};

export default SignUp;
