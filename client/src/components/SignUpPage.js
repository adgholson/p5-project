import React, { useState } from "react";
import './SignUpPage.css';
import VideoBackground from "./VideoBackground";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUser } from "./UserContext";

function SignUpPage() {
    const history = useHistory();
    const {onLogin} = useUser();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    if (!email) {
      setErrors(prevErrors => [...prevErrors, "Email"]);
      setIsLoading(false);
    }
    if (!username) {
      setErrors(prevErrors => [...prevErrors, "Username"]);
      setIsLoading(false);
    }
    if (!password) {
      setErrors(prevErrors => [...prevErrors, "Password"]);
      setIsLoading(false);
    }
    if (errors.length > 0) {
      return;
    }
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
    })
    .then((response) => {
      setIsLoading(false);
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("Invalid input. Please check your email, username, and password.");
      }
      throw new Error("An error occurred. Please try again later.");
    })
    .then((user) => {
      onLogin(user);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      setErrors(["An error occurred. Please try again later."]);
    });
  }

  return (
    <div className="signup-page">
      <VideoBackground/>
      <div className="form-container">
        <h1 className="signup-form-title">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label> {errors.includes("Email") && <p className="error-message">Email is required and must fit example@email.com format.</p>}
            <Form.Control
              type="text"
              placeholder="Enter an Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username</Form.Label> {errors.includes("Username") && <p className="error-message">Username is required and must include one number.</p>}
            <Form.Control
              type="text"
              placeholder="Enter a Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password</Form.Label> {errors.includes("Password") && <p className="error-message">Password is required and must contain at least one number, and one special character.</p>}
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