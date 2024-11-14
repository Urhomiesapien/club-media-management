// src/Components/home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const [gear, setGear] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setUserData(user);
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      // Fetch events
      const eventsResponse = await axios.get('http://localhost:5000/api/events', { headers });
      setEvents(eventsResponse.data);
      
      // Fetch gear
      const gearResponse = await axios.get('http://localhost:5000/api/gear', { headers });
      setGear(gearResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">Club Media Management</span>
          <div className="d-flex">
            <span className="navbar-text me-3">
              Welcome, {userData?.name}
            </span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Upcoming Events</h4>
            </div>
            <div className="card-body">
              {events.length > 0 ? (
                <ul className="list-group">
                  {events.map((event) => (
                    <li key={event.EventID} className="list-group-item">
                      <h5>{event.EventName}</h5>
                      <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
                      <p>Faculty: {event.EventFaculty}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming events</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Available Gear</h4>
            </div>
            <div className="card-body">
              {gear.length > 0 ? (
                <ul className="list-group">
                  {gear.map((item) => (
                    <li key={item.GearID} className="list-group-item">
                      <h5>{item.GearName}</h5>
                      <p>Type: {item.GearType}</p>
                      <span className={`badge ${
                        item.Availability === 'Available' ? 'bg-success' : 
                        item.Availability === 'In use' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {item.Availability}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No gear available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;