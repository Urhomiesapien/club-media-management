import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./css/home.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Adjust URL if necessary
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      {/* <aside className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/tasks">Tasks</Link></li>
        </ul>
      </aside> */}

      <main className="main-content">
        <h1>Events</h1>
        <div className="events-widget">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.EventName} className="event-card">
                <h3>{event.EventName}</h3>
                <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
                <p>Club: {event.clubs || 'N/A'}</p>
                <a href={event.mediaLink} target="_blank" rel="noopener noreferrer">
                  View Photos
                </a>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Events;
