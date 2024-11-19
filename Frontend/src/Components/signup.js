// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/signup.css'

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
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>SRN</label>
          <input
            type="memeberID"
            className="form-control"
            value={memberID}
            onChange={(e) => setmemberid(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;