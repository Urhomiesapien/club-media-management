import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import Events from './Components/events';
import Profile from './Components/profile';


function Navigation() {
  const location = useLocation(); // Get the current route
  const username = localStorage.getItem('username');

  // Conditionally render navigation links based on the route
  if (location.pathname === '/' || location.pathname === '/signup') {
    return (
      <nav>
        <Link to="/" className="btn btn-link">Login</Link>
        <Link to="/signup" className="btn btn-link">Signup</Link>
      </nav>
    );
  }

  // Show full navigation for other pages
  return (
    <nav>
      <Link to="/home" className="btn btn-link">Home</Link>
      <Link to="/events" className="btn btn-link">Events</Link>
      <Link to="/profile" className="btn btn-link">Profile: {username}</Link>
      {username ? (
        <span className="navbar-text"></span>
      ) 
      : (
        <>
          {/* <Link to="/login" className="btn btn-link">Login</Link> */}
          <Link to="/signup" className="btn btn-link">Signup</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Navigation /> {/* Render the navigation */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

// export default Navbar;
export default App;
