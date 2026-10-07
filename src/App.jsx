import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';

import './App.css';

const App = () => {
  return (
    <Router>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>

      <Footer />
    </Router>
  );
};

export default App;