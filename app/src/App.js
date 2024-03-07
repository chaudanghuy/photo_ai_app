import React from 'react';
import './App.css';
import Home from './screens/Home';
import Frame from './screens/Frame';
import Frame2 from './screens/Frame2';
import FrameThird from './screens/FrameThird';
import Payment from './screens/Payment';
import Photo from './screens/Photo';
import Filter from './screens/Filter';
import Print from './screens/Print';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frame" element={<Frame />} />
        <Route path="/frame2" element={<Frame2 />} />
        <Route path="/frame3" element={<FrameThird />} />
        <Route path="/payment" element={<Payment />} />        
        <Route path="/photo" element={<Photo />} />        
        <Route path="/filter" element={<Filter />} />        
        <Route path="/print" element={<Print />} />
      </Routes>
    </Router>
  );
}

export default App;
