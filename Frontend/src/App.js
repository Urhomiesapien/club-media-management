import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import Events from './Components/events';
import Profile from './Components/profile';
import './App.css'
function Navigation() {
  const location = useLocation(); // Get the current route
  const username = localStorage.getItem('username');

  // Conditionally render navigation links based on the route
  if (location.pathname === '/' || location.pathname === '/signup') {
    return (
      <nav>
        <div className="left-links">
          <Link to="/" className="btn btn-link">Login</Link>
          <Link to="/signup" className="btn btn-link">Signup</Link>
        </div>
      </nav>
    );
  }

  // Show full navigation for other pages
  return (
    <nav>
      <div className="left-links">
        <Link to="/home" className="btn btn-link">Home</Link>
        <Link to="/events" className="btn btn-link">Events</Link>
        {username ? (
          <span className="navbar-text"></span>
        ) : (
          <Link to="/signup" className="btn btn-link">Signup</Link>
        )}
      </div>
      <div className="right-links">
        <Link to="/profile" className="btn btn-link">Profile: {username}</Link>
        <Link to="/" className="btn btn-link">Login as another user</Link>
      </div>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <div className="container mt-0">
        <Navigation /> {/* Render the navigation */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Club Media Management. All Rights Reserved to Kamya And Manav.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
