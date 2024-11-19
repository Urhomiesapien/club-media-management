// Signup.js (Add the link wrapper similarly)
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For the link to Login
import './css/signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberID, setmemberid] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, email, password, memberID });
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully!') {
        window.alert("NEW USER CREATED- REDIRECTING TO LOGIN PAGE");
        window.location.href = '/';
      }
    } catch (error) {
      window.alert("COULDN'T SIGN UP- TRY AGAIN WITH A DIFFERENT USERNAME");
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {/* Centering the link here */}
      <div className="center-link">
        <Link to="/login" className="signup-link">Already have an account? Login</Link>
      </div>

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>SRN</label>
          <input
            type="text"
            value={memberID}
            onChange={(e) => setmemberid(e.target.value)}
            required
            placeholder="Enter your SRN"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn-submit">Sign Up</button>
      </form>
      {message && <div className="error-message">{message}</div>}
    </div>
  );
};

export default Signup;
