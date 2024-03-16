import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Photo.css";
import countdown from '../../assets/Photo/Snap/countdown.png';
import photocount from '../../assets/Photo/Snap/photocount.png';
import frame from '../../assets/Photo/Snap/frame.png';


function Photo() {
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
          <div className='photo-container'>
               <div className="left-photo-div" style={{ backgroundImage: `url(${countdown})` }}></div>
               <div className="right-photo-div" style={{ backgroundImage: `url(${photocount})` }}></div>
               <div className="middle-photo-div" style={{ backgroundImage: `url(${frame})` }} onClick={() => navigate('/photo-choose')}></div>
          </div>
     );
}

export default Photo;