// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For the link to Signup
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful!') {
        localStorage.setItem('username', username);
        window.location.href = '/home'; // Redirect to home page
      }
    } catch (error) {
      window.alert("RECHECK YOUR CREDENTIALS");
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login">
  <h2 className="container-h2">Login</h2>
  <form onSubmit={handleLogin}>
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
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
    </div>
    <button type="submit" className="btn-submit">Login</button>
  </form>
  <div className="message">{message}</div>
  <a href="/signup" className="login-link">Don't have an account? Sign up</a>
</div>

  );
};

export default Login;
