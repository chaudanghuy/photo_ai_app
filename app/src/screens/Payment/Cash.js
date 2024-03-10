import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";

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
      <div className="done-button"></div>
    </div>
  );
}

export default Cash;