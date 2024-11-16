import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  // Fetch profile data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${username}`)
      .then(response => {
        setProfile(response.data);
        setFormData(response.data); // Pre-fill form with fetched data
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, [username]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updates
  const handleSave = () => {
    axios.put(`http://localhost:5000/api/profile/${username}`, formData)
      .then(response => {
        setEditMode(false); // Exit edit mode
        setProfile(formData); // Update profile data with new data
        alert(response.data.message);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {editMode ? (
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.Name}</p>
          <p><strong>Email:</strong> {profile.Email}</p>
          <p><strong>Phone Number:</strong> {profile.PhoneNumber}</p>
          <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

