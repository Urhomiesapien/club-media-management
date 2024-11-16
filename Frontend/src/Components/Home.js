// // src/pages/Home.js
// import React from 'react';

// const Home = () => {
//   return (
//     <div className="container mt-5">
//       <h2>Welcome to the Home Page!</h2>
//       <p>You have successfully logged in.</p>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './home.css';
const Home = () => {
    // Dummy event data for testing the layout
    const events = [
      { id: 1, name: "Event 1", date: "2024-11-01", organizer: "Organizer A", driveLink: "#" },
      { id: 2, name: "Event 2", date: "2024-11-05", organizer: "Organizer B", driveLink: "#" },
      { id: 3, name: "Event 3", date: "2024-11-10", organizer: "Organizer C", driveLink: "#" },
    ];
  
// const Home = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('/api/events/latest');
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };
//     fetchEvents();
//   }, []);

  return (
    <div className="home-container">
      <aside className="sidebar">
      <h2>Navigation</h2>
        <ul>
          <li><Link to="/tasks">tasks</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Events</h1>
        <div className="events-widget">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Organizer: {event.organizer}</p>
              <a href={event.driveLink} target="_blank" rel="noopener noreferrer">
                View Photos
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;