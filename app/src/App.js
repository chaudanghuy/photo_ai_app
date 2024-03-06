import React from 'react';
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
        <Route path="/frame" element={<Frame />} />
        <Route path="/filter" element={<Filter />} />        
      </Routes>
    </Router>
  );
}

export default App;
