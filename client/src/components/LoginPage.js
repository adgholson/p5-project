import React, { useState } from "react";
import './LoginPage.css';
import { Form, Button } from "react-bootstrap";

const LoginPage = () => {
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
    <div className="login-page">
      <div className="form-container">
        <h1 className="login-form-title">Login</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Email"
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
              placeholder="Enter your Username"
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
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            Login
          </Button>
        </Form>
        <h2 className="login-form-account-text">Don't have an account?</h2>
        <h2 className="login-form-signup-text">Sign Up!</h2>
      </div>
    </div>
  );
};

export default LoginPage;
