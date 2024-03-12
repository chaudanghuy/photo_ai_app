import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
import continueBtn from '../../assets/Payment/Result/continueBtn.png';
import continueBtn_click from '../../assets/Payment/Result/continueBtn_click.png';

function QR() {
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
          <div className='payment-result-container'>
               <div style={{backgroundImage: `url(${hoveredImage === continueBtn ? continueBtn_click : continueBtn})`}} className="done-button" onClick={() => navigate('/photo')} onMouseEnter={() => handleMouseEnter(continueBtn)} onMouseLeave={handleMouseLeave}></div>               
          </div>
     );
}

export default QR;