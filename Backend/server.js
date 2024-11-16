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
// app.post('/api/signup', (req, res) => {
//   const { username, email, password } = req.body;
//   const query = 'INSERT INTO login ( username, email, password) VALUES ( ?, ?, ?)';
//   db.query(query, [ username, email, password], (err) => {
//     if (err) {
//       console.error(err.message);
//       console.log('sign up NOT successful');  // LOG
//       return res.status(500).json({ error: 'Database error during signup' });
//     }
//     console.log('sign up successful');  // LOG
//     res.status(201).json({ message: 'User registered successfully!', redirect: '/login' });
//   });
// });

// Signup route - Adds user to the database and redirects to profile page
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  const query = 'INSERT INTO login (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err.message);
      console.log('sign up NOT successful');  // LOG
      return res.status(500).json({ error: 'Database error during signup' });
    }
    const memberID = result.insertId; // Get the new user's ID
    console.log('Signup successful');
    res.status(201).json({ message: 'User registered successfully!', redirect: `/profile` });
    // res.status(201).json({ message: 'User registered successfully!', redirect: `/profile/${memberID}` });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  console.log('Landed to login page');  // LOG
  const { username, password } = req.body;
  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      console.log('login successful');  // LOG
      res.status(200).json({ message: 'Login successful!', redirect: '/home' }); // here is where it goes to home after logging in 
    } else {
      console.error(err.message)
      console.log('login not successful');  // LOG
      res.status(401).json({ message: 'Invalid credentials!', redirect: '/home' });
    }
  });
});

// // Profile update route - Updates user details in the database: EDIT
// app.post('/api/update-profile', (req, res) => {
//   const { memberID, fullName, age, bio, contact } = req.body;

//   const query = 'UPDATE member SET fullName = ?, age = ?, bio = ?, contact = ? WHERE memberID = ?';
//   db.query(query, [fullName, age, bio, contact, memberID], (err) => {
//     if (err) {
//       console.error('Error updating profile:', err.message);
//       return res.status(500).json({ error: 'Database error during profile update' });
//     }
//     res.status(200).json({ message: 'Profile updated successfully!' });
//   });
// });

// Home route
app.get('/api/home', (req, res) => {
  res.status(200).json({ message: 'Welcome to the homepage!' });
  console.log('Landed to home page');  // LOG
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
