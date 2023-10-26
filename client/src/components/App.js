import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" render={(props) => <LoginPage {...props} onLogin={handleLogin} />} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
