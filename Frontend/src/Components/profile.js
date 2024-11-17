// src/Components/Profile.js
// src/Components/Profile.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const { memberID } = useParams(); // Get memberID from URL parameters
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/update-profile', {
        memberID,
        fullName,
        age,
        bio,
        contact,
      });
      setMessage(response.data.message);
      navigate('/home'); // Redirect to home after updating profile
    } catch (error) {
      setMessage('Profile update failed. Please try again.');
      console.error('Profile update error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-control"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Save Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;

