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
