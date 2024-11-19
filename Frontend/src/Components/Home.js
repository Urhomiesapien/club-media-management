import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/home.css";

const Home = () => {
  const [event, setEvent] = useState(null); // State to hold the event data
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const response = await axios.get('/api/home'); // API call to fetch latest event
        setEvent(response.data); // Store the event data in state
      } catch (error) {
        console.error("Error fetching the latest event:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchLatestEvent(); // Fetch the latest event
  }, []);

  if (loading) {
    return <p>Loading latest event...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="home-container">
      {/* Image Banner */}
      <div className="image-banner">
        <img 
          src="https://www.livemint.com/lm-img/img/2024/07/03/600x338/camera_buying_guide_1720008963555_1720013606919.jpg" 
          alt="Event Banner" 
          className="banner-img" 
        />
      </div>

      <main className="main-content">
        <h1>Welcome to Club Media Management System</h1>
        {event ? (
          <div className="event-card">
            <h3>{event.EventName}</h3>
            <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
            <p>Organizer: {event.Organizer}</p>
            <a href={event.DriveLink} target="_blank" rel="noopener noreferrer">
              View Photos
            </a>
          </div>
        ) : (
          <p>No Announcements Yet.</p>
        )}
      </main>
    </div>
  );
};

export default Home;

