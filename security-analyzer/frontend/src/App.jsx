import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './Home';
import Scanner from './Scanner';
import Login from './Login';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <Header />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Decorative ASCII border */}
        <div style={{ position: 'fixed', bottom: 10, left: 10, color: 'var(--data-gray)', fontSize: '0.6rem', pointerEvents: 'none' }}>
          <pre>{`
    __  _ 
   / _\| |
   \ \  | |
   _\ \ | |
   \__/ |_|
          `}</pre>
        </div>
      </div>
    </Router>
  );
}

export default App;
