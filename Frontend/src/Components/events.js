import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Install: npm install react-modal
import './css/events.css'
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
      <h2 className="events-title">Events</h2> {/* Apply the CSS class here */}
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
