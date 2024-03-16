import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import Background from './Background';
// Import images
import confirm from '../../assets/Frame/Layout/confirm.png';
import confirm_click from '../../assets/Frame/Layout/confirm_click.png';


function Layout() {
     const [hoveredImage, setHoveredImage] = useState(null);
     const [hoverImageButton, setHoverImageButton] = useState(null);
     const [layoutBackground, setLayoutBackground] = useState(null);
     const { t } = useTranslation();
     const navigate = useNavigate();

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
          }

          const sessionStyleBg = sessionStorage.getItem('styleBg');
          if (sessionStyleBg) {
               let layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
               if (sessionStyleBg == 'seasons') {
                    layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
               } else if (sessionStyleBg == 'party') {
                    layoutBg = require(`../../assets/Frame/Layout/Party/BG.png`);
               } else if (sessionStyleBg == 'cartoon') {
                    layoutBg = require(`../../assets/Frame/Layout/Cartoon/BG.png`);
               } else if (sessionStyleBg == 'minimalism') {
                    layoutBg = require(`../../assets/Frame/Layout/Minimalism/BG.png`);
               } else if (sessionStyleBg == 'collab') {
                    layoutBg = require(`../../assets/Frame/Layout/Collab/BG.png`);
               }
               setLayoutBackground(layoutBg);
          }
     }, []);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const goToPayment = () => {
          navigate('/payment');
     }

     return (
          <div className='layout-container' style={{ backgroundImage: `url(${layoutBackground})` }}>
               <div className="go-back" onClick={() => navigate("/frame-step-2")}></div>
               <div
                    className="confirm-layout-button"
                    style={{ backgroundImage: `url(${hoverImageButton === confirm ? confirm_click : confirm})` }}
                    onMouseEnter={() => setHoverImageButton(confirm)}
                    onMouseLeave={() => setHoverImageButton(null)}
                    onClick={goToPayment}
               ></div>
          </div>
     );
};

export default Layout;