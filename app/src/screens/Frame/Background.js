import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Frame.css";
import axios from 'axios';

function Background() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [backgrounds, setBackgrounds] = useState([]);

     // This to save the selected frame in session storage
     const [selectedFrame, setSelectedFrame] = useState(null);

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
          }

          const frame = sessionStorage.getItem('selectedFrame');
          if (frame) {
               setSelectedFrame(JSON.parse(frame).frame);
          }
     })

     useEffect(() => {
          fetchBackgrounds()
     }, [])

     const fetchBackgrounds = async () => {
          try {
               const response = await axios.get(`${process.env.REACT_APP_BACKEND}/backgrounds/api`)
               const backgroundDatas = response.data

               const newBackgrounds = backgroundDatas.map(item => ({
                    title: item.title,
                    photo: process.env.REACT_APP_BACKEND + item.photo,
                    photo_hover: process.env.REACT_APP_BACKEND + item.photo_hover
               }));
               setBackgrounds(backgrounds.concat(newBackgrounds));
          } catch (error) {
               console.error(error)
          }
     }

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const goToLayout = (title) => {
          sessionStorage.setItem('styleBg', title);
          navigate('/layout');
     }

     return (
          <div className='style-container'>
               <div className="go-back" onClick={() => navigate("/frame")}></div>
               <div className="style-section">
                    {backgrounds.map((item, index) => (
                         <div key={index} className="style-column">
                              <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === item.photo ? item.photo_hover : item.photo})` }} onMouseEnter={() => handleMouseEnter(item.photo)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout(item.title)}></div>
                         </div>
                    ))}
               </div>
          </div>
     );
}

export default Background;