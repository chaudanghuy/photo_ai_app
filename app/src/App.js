import React from 'react';
import './App.css';
import Home from './screens/Home';
import Frame from './screens/Frame/Frame';
import FrameBackground from './screens/Frame/FrameBackground';
import FrameLayout from './screens/Frame/FrameLayout';
import Payment from './screens/Payment/Payment';
import PaymentCash from './screens/Payment/PaymentCash';
import PaymentMOMO from './screens/Payment/PaymentMOMO';
import PaymentZALO from './screens/Payment/PaymentZALO';
import PaymentPromo from './screens/Payment/PaymentPromo';
import PaymentResult from './screens/Payment/PaymentResult';
import Photo from './screens/Photo/Photo';
import PhotoChoose from './screens/Photo/PhotoChoose';
import Print from './screens/Print';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frame" element={<Frame />} />
        <Route path="/frame-step-2" element={<FrameBackground />} />
        <Route path="/frame-step-3" element={<FrameLayout />} />
        <Route path="/payment" element={<Payment />} />        
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/payment-cash" element={<PaymentCash />} />
        <Route path="/payment-momo" element={<PaymentMOMO />} />
        <Route path="/payment-zalo" element={<PaymentZALO />} />
        <Route path="/payment-promo" element={<PaymentPromo />} />
        <Route path="/photo" element={<Photo />} />        
        <Route path="/photo-choose" element={<PhotoChoose />} />                                
        <Route path="/print" element={<Print />} />
      </Routes>
    </Router>
  );
}

export default App;
