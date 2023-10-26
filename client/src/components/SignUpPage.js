import React, { useState } from "react";
import './SignUpPage.css';
import VideoBackground from "./VideoBackground";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SignUpPage({ onLogin }) {
  const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
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
    <div className="signup-page">
      <VideoBackground/>
      <div className="form-container">
        <h1 className="signup-form-title">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
          {isLoading ? "Loading..." : "SignUp"}
          </Button>
          <Form.Group>
            {errors.map((err) => (
                <Modal key={err}>{err}</Modal>
            ))}
        </Form.Group>
        </Form>
        <h2 className="signup-form-account-text">Have an account?</h2>
        <h2 className="signup-form-login-text" onClick={() => history.push('/login')}>Login!</h2>
      </div>
    </div>
  );
};

export default SignUpPage;