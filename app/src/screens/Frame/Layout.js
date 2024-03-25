import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import Background from './Background';
import axios from 'axios';
// Import images
import confirm from '../../assets/Frame/Layout/confirm.png';
import confirm_click from '../../assets/Frame/Layout/confirm_click.png';


function Layout() {
     const [hoveredImage, setHoveredImage] = useState(null);
     const [hoverImageButton, setHoverImageButton] = useState(null);
     const [layoutBackground, setLayoutBackground] = useState(null);
     const [layouts, setLayouts] = useState([]);
     const [clickedIndex, setClickedIndex] = useState(null);
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
               if (sessionStyleBg == 'Seasons') {
                    layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
               } else if (sessionStyleBg == 'Party') {
                    layoutBg = require(`../../assets/Frame/Layout/Party/BG.png`);
               } else if (sessionStyleBg == 'Cartoon') {
                    layoutBg = require(`../../assets/Frame/Layout/Cartoon/BG.png`);
               } else if (sessionStyleBg == 'Minimalism') {
                    layoutBg = require(`../../assets/Frame/Layout/Minimalism/BG.png`);
               } else if (sessionStyleBg == 'Collab') {
                    layoutBg = require(`../../assets/Frame/Layout/Collab/BG.png`);
               }
               setLayoutBackground(layoutBg);
          }
     }, []);

     useEffect(() => {
          const fetchLayoutsByBackground = async () => {
               try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/layouts/api/by-background/` + sessionStorage.getItem('styleBg'));
                    const layoutDatas = response.data
                    const newBackgrounds = layoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BACKEND + item.photo,
                         photo_cover: process.env.REACT_APP_BACKEND + item.photo_cover
                    }));
                    setLayouts(newBackgrounds);
               } catch (error) {
                    console.error(error)
               }
          }

          fetchLayoutsByBackground()
     }, [])

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const handleClick = (index) => {
          sessionStorage.setItem('selectedLayout', JSON.stringify(layouts[index]));
          setClickedIndex(index === clickedIndex ? null : index);
     }

     const goToPayment = () => {
          navigate('/payment');
     }

     return (
          <div className='layout-container' style={{ backgroundImage: `url(${layoutBackground})` }}>
               <div className="go-back" onClick={() => navigate("/frame-step-2")}></div>
               <div className="style-section">               
               {layouts.map((item, index) => (                    
                    <div key={item.id} className="style-column">
                         <div className="image-style-div">
                              <div className={`layout-overlay ${index === clickedIndex ? 'clicked' : ''}`} style={{ backgroundImage: `url(${item.photo_cover})` }} onClick={() => handleClick(index)}></div>
                         </div>
                    </div>               
               ))}
               </div>
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