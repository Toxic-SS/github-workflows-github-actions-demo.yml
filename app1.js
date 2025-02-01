// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Students from './Students';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const App = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <div>
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;