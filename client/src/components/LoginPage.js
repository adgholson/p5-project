import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import './LoginPage.css';
import { Form, Button, Modal } from "react-bootstrap";
import { useUser } from "./UserContext";

function LoginPage() {
  const history = useHistory();
  const { onLogin } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    if (!username) {
      setErrors(prevErrors => [...prevErrors, "Username is required."]);
      setIsLoading(false);
    }
    if (!password) {
      setErrors(prevErrors => [...prevErrors, "Password is required."]);
      setIsLoading(false);
    }
    if (errors.length > 0) {
      return;
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          const { id, username, email } = user;
          onLogin({ id, username, email });
          history.push("/dashboard");
        });
      } else {
        if (r.status === 401) {
          setErrors(prevErrors => [...prevErrors, "Invalid username or password. Please try again."]);
        } else {
          setErrors(prevErrors => [...prevErrors, "An error occurred. Please try again later."]);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
      setErrors(prevErrors => [...prevErrors, "An error occurred. Please try again later."]);
    });
  }

  return (
    <div className="login-page">
      <VideoBackground/>
      <div className="form-container">
        <h1 className="login-form-title">Login</h1>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username</Form.Label> {errors.includes("Username is required.") && <p className="error-message">Username is required</p>}
            <Form.Control
              type="text"
              placeholder="Enter your Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password</Form.Label> {errors.includes("Password is required.") && <p className="error-message">Password is required</p>}
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
        <h2 className="login-form-signup-text" onClick={() => history.push('/signup')}>
          Sign Up!
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;
