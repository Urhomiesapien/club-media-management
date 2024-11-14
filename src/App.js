// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import from react-router-dom
import Login from './pages/login';   // Ensure Login is imported
import Signup from './pages/signup'; // Ensure Signup is imported
import Home from './pages/home';


function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav>
          <Link to="/" className="btn btn-link">Login</Link>
          <Link to="/signup" className="btn btn-link">Signup</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;