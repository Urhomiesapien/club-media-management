// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal'; // Install: npm install react-modal

// const Tasks = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch all events
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tasks');
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleEventClick = async (eventID) => {
//     // Fetch event details by ID
//     try {
//       const response = await axios.get(`http://localhost:5000/api/tasks/${eventID}`);
//       setSelectedEvent(response.data);
//       setModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching event details:', error);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Tasks</h2>
//       <div className="events-list">
//         {events.map((event) => (
//           <div key={event.EventID} className="event-card">
//             <h3 onClick={() => handleEventClick(event.EventID)} style={{ cursor: 'pointer', color: 'blue' }}>
//               {event.EventName}
//             </h3>
//             <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
//             <p>Club: {event.clubs}</p>
//             <p>Members: {event.Members}</p>
//             <p>Media Link: <a href={event.mediaLink} target="_blank" rel="noopener noreferrer">View</a></p>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Event Details */}
//       {selectedEvent && (
//         <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="Event Details">
//           <h2>{selectedEvent.EventName}</h2>
//           <p><strong>Date:</strong> {new Date(selectedEvent.EventDate).toLocaleDateString()}</p>
//           <p><strong>Club:</strong> {selectedEvent.clubs}</p>
//           <p><strong>Media Link:</strong> <a href={selectedEvent.mediaLink} target="_blank" rel="noopener noreferrer">View</a></p>
//           <p><strong>Faculty:</strong> {selectedEvent.EventFaculty}</p>
//           <p><strong>Gear ID:</strong> {selectedEvent.GearID}</p>
//           <p><strong>Expense ID:</strong> {selectedEvent.ExpenseID}</p>
//           <button onClick={closeModal} className="btn btn-secondary mt-3">Close</button>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Tasks;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = ({ username }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newDescription, setNewDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/tasks/${username}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [username]);

    const handleUpdate = async (task) => {
        try {
            await axios.put(`/api/tasks/${task.EventID}`, {
                TaskDescription: newDescription || task.TaskDescription,
                TaskCompleted: completed,
            });
            alert('Task updated successfully');
            setSelectedTask(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleAddTask = async () => {
        const eventName = prompt('Enter event name:');
        const taskDescription = prompt('Enter task description:');
        const assignee = username;

        if (eventName && taskDescription) {
            try {
                await axios.post('/api/tasks', { EventName: eventName, TaskDescription: taskDescription, Assignee: assignee });
                alert('Task added successfully');
                window.location.reload();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    return (
        <div>
            <h1>My Tasks</h1>
            <button onClick={handleAddTask}>Add Task</button>
            <div>
                {tasks.map((task) => (
                    <div key={task.EventID}>
                        <h3 onClick={() => setSelectedTask(task)}>{task.EventName}</h3>
                        <p>{task.TaskDescription}</p>
                        <p>Assignee: {task.Assignee}</p>
                        <p>Status: {task.TaskCompleted ? 'Completed' : 'Pending'}</p>
                    </div>
                ))}
            </div>
            {selectedTask && (
                <div className="modal">
                    <h2>Edit Task</h2>
                    <p>Event Name: {selectedTask.EventName}</p>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder={selectedTask.TaskDescription}
                    />
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    </label>
                    <button onClick={() => handleUpdate(selectedTask)}>Save</button>
                    <button onClick={() => setSelectedTask(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Tasks;
