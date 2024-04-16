import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Print.css";

// Background
import background_en from '../assets/Prints/BG.png';
import background_kr from '../assets/Prints/kr/BG.png';
import background_vn from '../assets/Prints/vn/BG.png';

function Print() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);

     const [background, setBackground] = useState(background_en);

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage === 'en') {
               setBackground(background_en);
          } else if (storedLanguage === 'ko') {
               setBackground(background_kr);
          } else if (storedLanguage === 'vi') {
               setBackground(background_vn);
          }
     }, [])

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const clearSessionStorageAndLeaveOut = () => {
          sessionStorage.clear();
          setTimeout(() => {
               navigate('/');
          }, 5000);
     }

     useEffect(() => {
          clearSessionStorageAndLeaveOut();
     }, []);

     return (
          <div className='print-container' style={{ backgroundImage: `url(${background})` }}></div>
     );
}

export default Print;