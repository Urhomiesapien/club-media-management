// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true // required for cookies, authorization headers with HTTPS
}));
app.use(bodyParser.json());

// Signup route
app.post('/api/signup', (req, res) => {
  const { username, email, password, memberID } = req.body;

  // Check if the memberID exists
  const checkMemberQuery = 'SELECT * FROM Member WHERE MemberID = ?';
  db.query(checkMemberQuery, [memberID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error during member validation' });
    }

    if (results.length === 0) {
      // Insert into Member table if the memberID does not exist
      const insertMemberQuery = `
        INSERT INTO Member (MemberID, Name, Email, PhoneNumber, Gear, EventsParticipated, Username, Password)
        VALUES (?, 'N/A' , ?, 'N/A', 'N/A', 'N/A', ?, ?)
      `;
      db.query(insertMemberQuery, [memberID, email, username, password], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database error during member insertion' });
        }
        console.log('Member added successfully');
      });
    }

    // Insert into Login table
    const insertLoginQuery = `
      INSERT INTO Login (username, email, password)
      VALUES (?, ?, ?)
    `;
    db.query(insertLoginQuery, [username, email, password], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error during login creation' });
      }
      res.status(200).json({ message: 'User registered successfully!' });
    });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      console.log('login successful');  // LOG
      res.status(200).json({ message: 'Login successful!', redirect: '/home' }); // here is where it goes to home after logging in 
    } else {
      // console.error(err.message)
      console.log('login not successful');  // LOG
      res.status(401).json({ message: 'Invalid credentials!', redirect: '/home' });
    }
  });
});

// Home route
app.get('/api/home', (req, res) => {
  res.status(200).json({ message: 'Welcome to the homepage!' });
  console.log('Landed to home page');  // LOG
});

// Fetch all events
app.get('/api/events', (req, res) => {
  const query = `SELECT EventName, EventDate, clubs, mediaLink FROM Events`;
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching events:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
  });
});

// Fetch Profile
app.get('/api/profile/:username', (req, res) => {
  const { username } = req.params;
  const query = 'CALL GetProfile(?)';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching profile.' });
    res.status(200).json(results[0][0]); // Access first row of the result
  });
});

// Update Profile
app.put('/api/profile/:username', (req, res) => {
  const { username } = req.params;
  const { Name, Email, PhoneNumber, Gear, EventsParticipated } = req.body;
  const query = 'CALL UpdateProfile(?, ?, ?, ?, ?, ?)';
  db.query(query, [username, Name, Email, PhoneNumber, Gear, EventsParticipated], (err) => {
    if (err) return res.status(500).json({ error: 'Error updating profile.' });
    res.status(200).json({ message: 'Profile updated successfully.' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
