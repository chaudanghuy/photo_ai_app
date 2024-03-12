import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
import done from '../../assets/Payment/Cash/done.png';
import done_click from '../../assets/Payment/Cash/done_click.png';

function Cash() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  }

  const handleMouseLeave = () => {
    setHoveredImage(null);
  }

  return (
    <div className='cash-container'>
      <div className="go-back" onClick={() => navigate("/payment")}></div>
      <div className="paid-cash"></div>
      <div className="insert-cash"></div>
      <div style={{backgroundImage: `url(${hoveredImage === done ? done_click : done})`}} className="done-button" onClick={() => navigate('/payment-result')} onMouseEnter={() => handleMouseEnter(done)} onMouseLeave={handleMouseLeave}></div>
    </div>
  );
}

export default Cash;