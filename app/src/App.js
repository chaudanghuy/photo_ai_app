import React from 'react';
import './App.css';
import Home from './screens/Home';
import Frame from './screens/Frame/Frame';
import Background from './screens/Frame/Background';
import Layout from './screens/Frame/Layout';
import Payment from './screens/Payment/Payment';
import Cash from './screens/Payment/Cash';
import QR from './screens/Payment/QR';
import Promo from './screens/Payment/Promo';
import Result from './screens/Payment/Result';
import Photo from './screens/Photo/Photo';
import Choose from './screens/Photo/Choose';
import Print from './screens/Print';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frame" element={<Frame />} />
        <Route path="/frame-step-2" element={<Background />} />
        <Route path="/frame-step-3" element={<Layout />} />
        <Route path="/payment" element={<Payment />} />        
        <Route path="/payment-result" element={<Result />} />
        <Route path="/payment-cash" element={<Cash />} />
        <Route path="/payment-momo" element={<QR />} />
        <Route path="/payment-promo" element={<Promo />} />
        <Route path="/photo" element={<Photo />} />        
        <Route path="/photo-choose" element={<Choose />} />                                
        <Route path="/print" element={<Print />} />
      </Routes>
    </Router>
  );
}

export default App;
