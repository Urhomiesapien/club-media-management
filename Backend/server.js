const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'club_media_management'
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM Member WHERE Username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.Password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.MemberID }, 
      'your_jwt_secret', 
      { expiresIn: '1h' }
    );
    
    res.json({
      token,
      user: {
        id: user.MemberID,
        name: user.Name,
        email: user.Email,
        username: user.Username
      }
    });
  });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password, email, name, phoneNumber } = req.body;
  
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate MemberID (you can modify this logic as needed)
    const memberId = 'MEM' + Date.now().toString().slice(-6);
    
    const query = `
      INSERT INTO Member (MemberID, Name, Email, PhoneNumber, Username, Password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(
      query,
      [memberId, name, email, phoneNumber, username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Signup error:', err);
          return res.status(500).json({ error: 'Error creating account' });
        }
        
        const token = jwt.sign(
          { userId: memberId },
          'your_jwt_secret',
          { expiresIn: '1h' }
        );
        
        res.json({
          token,
          user: {
            id: memberId,
            name,
            email,
            username
          }
        });
      }
    );
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating account' });
  }
});

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Protected routes
// app.get('/api/events', authenticateToken, (req, res) => {
//   const query = 'SELECT * FROM Events ORDER BY EventDate';
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.json(results);
//   });
// });

// app.get('/api/gear', authenticateToken, (req, res) => {
//   const query = 'SELECT * FROM Gear';
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.json(results);
//   });
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});