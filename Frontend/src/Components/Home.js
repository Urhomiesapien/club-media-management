// // src/pages/Home.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import "./css/home.css";
// const Home = () => {
//     // Dummy event data for testing the layout
//     const events = [
//       { id: 1, name: "Event 1", date: "2024-11-01", organizer: "Organizer A", driveLink: "#" },
//       { id: 2, name: "Event 2", date: "2024-11-05", organizer: "Organizer B", driveLink: "#" },
//       { id: 3, name: "Event 3", date: "2024-11-10", organizer: "Organizer C", driveLink: "#" },
//     ];
  
// // const Home = () => {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const response = await axios.get('/api/events/latest');
// //         setEvents(response.data);
// //       } catch (error) {
// //         console.error("Error fetching events:", error);
// //       }
// //     };
// //     fetchEvents();
// //   }, []);

//   return (
//     <div className="home-container">
//       {/* <aside className="sidebar">
//       <h2>Navigation</h2>
//         <ul>
//           <li><Link to="/tasks">tasks</Link></li>
//         </ul>
//       </aside> */}

//       <main className="main-content">
//         <h1>Events</h1>
//         <div className="events-widget">
//           {events.map((event) => (
//             <div key={event.id} className="event-card">
//               <h3>{event.name}</h3>
//               <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//               <p>Organizer: {event.organizer}</p>
//               <a href={event.driveLink} target="_blank" rel="noopener noreferrer">
//                 View Photos
//               </a>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./css/home.css";

// const Home = () => {
//   const [latestEvent, setLatestEvent] = useState(null);

//   useEffect(() => {
//     const fetchLatestEvent = async () => {
//       try {
//         const response = await axios.get('/api/home');
//         setLatestEvent(response.data);
//       } catch (error) {
//         console.error("Error fetching latest event:", error);
//       }
//     };
//     fetchLatestEvent();
//   }, []);

//   return (
//     <div className="home-container">
//       <main className="main-content">
//         <h1>Latest Event</h1>
//         {latestEvent ? (
//           <div className="event-card">
//             <h3>{latestEvent.EventName}</h3>
//             <p>Date: {new Date(latestEvent.EventDate).toLocaleDateString()}</p>
//             <p>Organizer: {latestEvent.Organizer}</p>
//             <a href={latestEvent.DriveLink} target="_blank" rel="noopener noreferrer">
//               View Photos
//             </a>
//           </div>
//         ) : (
//           <p>Loading latest event...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./css/home.css";

// const Home = () => {
//   const [event, setEvent] = useState(); // State to hold the event data

//   useEffect(() => {
//     // Fetch the latest event when the component mounts
//     const fetchLatestEvent = async () => {
//       try {
//         const response = await axios.get('/api/home'); // API call to fetch latest event
//         setEvent(response.data); // Store the event data in state
//       } catch (error) {
//         console.error("Error fetching the latest event:", error);
//       }
//     };
    
//     fetchLatestEvent(); // Fetch the latest event
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   return (
//     <div className="home-container">
//       <main className="main-content">
//         <h1>Latest Event</h1>
//         {event ? ( // Check if event data exists
//           <div className="event-card">
//             <h3>{event.EventName}</h3>
//             <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
//             <p>Organizer: {event.Organizer}</p>
//             <a href={event.DriveLink} target="_blank" rel="noopener noreferrer">
//               View Photos
//             </a>
//           </div>
//         ) : (
//           <p>Loading latest event...</p> // Show loading message while data is being fetched
//         )}
//         <div className="event-card">
//             <h3>{event.EventName}</h3>
//             <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
//             <p>Organizer: {event.Organizer}</p>
//             <a href={event.DriveLink} target="_blank" rel="noopener noreferrer">
//               View Photos
//             </a>
//           </div>
//       </main>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/home.css";

const Home = () => {
  const [event, setEvent] = useState(null); // State to hold the event data
  const [loading, setLoading] = useState(true); // State to manage loading state


  useEffect(() => {
    // Fetch the latest event when the component mounts
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
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <p>Loading latest event...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="home-container">
      <main className="main-content">
        <h1>Latest Event</h1>
        {event ? ( // Check if event data exists
          <div className="event-card">
            <h3>{event.EventName}</h3>
            <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
            <p>Organizer: {event.Organizer}</p>
            <a href={event.DriveLink} target="_blank" rel="noopener noreferrer">
              View Photos
            </a>
          </div>
        ) : (
          <p>No event found.</p> // If no event data is available
        )}
      </main>
    </div>
  );
};

export default Home;
