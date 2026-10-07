import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './views/Inicio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Registro from './views/Registro';

import './App.css';

const App = () => {
  return (
    <Router>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;