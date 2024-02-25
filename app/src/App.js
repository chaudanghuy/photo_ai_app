import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import Filter from './screens/Filter';
import Frame from './screens/Frame';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </Router>
  );
}

export default App;
