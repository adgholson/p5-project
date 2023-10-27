import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";
import CommunityPage from "./CommunityPage";
import GameDetailsPage from "./GameDetailsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  useEffect(() => {
    fetch("/games")
      .then((response) => response.json())
      .then((data) => setGames(data.games))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" render={(props) => <LoginPage {...props} onLogin={handleLogin} />} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route path="/community" exact render={() => <CommunityPage games={games} />} />
          <Route path="/gamedetails/:gameId" render={(props) => <GameDetailsPage {...props} games={games} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
