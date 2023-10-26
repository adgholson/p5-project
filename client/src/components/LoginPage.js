import React, { useState } from "react";
import './LoginPage.css';
import { Form, Button, Modal } from "react-bootstrap";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="login-form-title">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
          {isLoading ? "Loading..." : "Login"}
          </Button>
          <Form.Group>
            {errors.map((err) => (
                <Modal key={err}>{err}</Modal>
            ))}
        </Form.Group>
        </Form>
        <h2 className="login-form-account-text">Don't have an account?</h2>
        <h2 className="login-form-signup-text">Sign Up!</h2>
      </div>
    </div>
  );
};

export default LoginPage;
