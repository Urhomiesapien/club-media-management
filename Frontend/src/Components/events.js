// import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// import axios from 'axios';
// import "./css/home.css";

// const Events = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch events from the backend
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('/api/events'); // Adjust URL if necessary
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="home-container">

//       <main className="main-content">
//         <h1>Events</h1>
//         <div className="events-widget">
//           {events.length > 0 ? (
//             events.map((event) => (
//               <div key={event.EventName} className="event-card">
//                 <h3>{event.EventName}</h3>
//                 <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
//                 <p>Club: {event.clubs || 'N/A'}</p>
//                 <a href={event.mediaLink} target="_blank" rel="noopener noreferrer">
//                   View Photos
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p>No events found.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Events;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Install: npm install react-modal

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = async (eventID) => {
    // Fetch event details by ID
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${eventID}`);
      setSelectedEvent(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="container mt-5">
      <h2>Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.EventID} className="event-card">
            <h3 onClick={() => handleEventClick(event.EventID)} style={{ cursor: 'pointer', color: 'blue' }}>
              {event.EventName}
            </h3>
            <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
            <p>Club: {event.clubs}</p>
            <p>Members: {event.Members}</p>
            <p>Media Link: <a href={event.mediaLink} target="_blank" rel="noopener noreferrer">View</a></p>
          </div>
        ))}
      </div>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="Event Details">
          <h2>{selectedEvent.EventName}</h2>
          <p><strong>Date:</strong> {new Date(selectedEvent.EventDate).toLocaleDateString()}</p>
          <p><strong>Club:</strong> {selectedEvent.clubs}</p>
          <p><strong>Media Link:</strong> <a href={selectedEvent.mediaLink} target="_blank" rel="noopener noreferrer">View</a></p>
          <p><strong>Faculty:</strong> {selectedEvent.EventFaculty}</p>
          <p><strong>Gear ID:</strong> {selectedEvent.GearID}</p>
          <p><strong>Expense ID:</strong> {selectedEvent.ExpenseID}</p>
          <button onClick={closeModal} className="btn btn-secondary mt-3">Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Events;
