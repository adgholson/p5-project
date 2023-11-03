import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";
import CommunityPage from "./CommunityPage";
import GameDetailsPage from "./GameDetailsPage";
import { UserProvider } from './UserContext';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`/games`)
      .then((response) => response.json())
      .then((data) => setGames(data.games))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);


  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/dashboard" render={(props) => <Dashboard {...props} games={games} />} />
            <Route path="/community" render={() => <CommunityPage games={games} />} />
            <Route path="/gamedetails/:gameId" component={GameDetailsPage} />
          </Switch>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
