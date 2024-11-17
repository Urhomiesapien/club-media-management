// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import from react-router-dom
// import Home from './Components/Home';
// import Login from './Components/login';   // Ensure Login is imported
// import Signup from './Components/signup'; // Ensure Signup is imported
// import Events from './Components/events';
// import Profile from './Components/profile';

// function App() {
//   return (
//     <Router>
//       <div className="container mt-5">
//         <nav>
//           <Link to="/" className="btn btn-link">Login</Link>
//           <Link to="/signup" className="btn btn-link">Signup</Link>
//           <Link to="/events" className="btn btn-link">Events</Link>
//           <Link to="/profile" className="btn btn-link">Profiles</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // In App.js, add this route inside your Routes component
// {/* <Route path="/home" element={<Home />} /> */}

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import Events from './Components/events';
import Profile from './Components/profile';
import './App.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      {location.pathname === '/' || location.pathname === '/signup' ? (
        <>
          <Link to="/" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </>
      )}
    </nav>
  );
}


function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Navigation /> {/* Render the navigation */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
