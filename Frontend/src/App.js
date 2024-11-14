// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import from react-router-dom
import Home from './Components/Home';
import Login from './Components/login';   // Ensure Login is imported
import Signup from './Components/signup'; // Ensure Signup is imported

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav>
          <Link to="/" className="btn btn-link">Login</Link>
          <Link to="/signup" className="btn btn-link">Signup</Link>
          {/* <Link to="/home" className="btn btn-link">Home</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// In App.js, add this route inside your Routes component
{/* <Route path="/home" element={<Home />} /> */}

export default App;
