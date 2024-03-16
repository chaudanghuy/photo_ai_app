import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Sticker.css";
import frame from '../assets/Sticker/frame.png';
import sticker_frame from '../assets/Sticker/sticker_frame.png';
import sticker_taskbar from '../assets/Sticker/sticker_taskbar.png';
import mood from '../assets/Sticker/mood.png';
import lovely from '../assets/Sticker/lovely.png';
import cartoon from '../assets/Sticker/cartoon.png';
import y2k from '../assets/Sticker/y2k.png';
import print from '../assets/Sticker/print.png';

function Filter() {
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
          <div className='sticker-container'>
               <div className="go-back" onClick={() => navigate("/photo-choose")}></div>
               <div className="left-sticker" style={{ backgroundImage: `url(${frame})` }}></div>
               <div className="middle-sticker" style={{ backgroundImage: `url(${sticker_frame})` }}>       
                    <div className="sticker-line" style={{marginTop: '23%'}}>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
               </div>
               <div className="right-sticker" style={{ backgroundImage: `url(${sticker_taskbar})` }}>
                    <div className="sticker-category">
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${mood})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${lovely})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${cartoon})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${y2k})` }}></div>
                    </div>                    
                    <div className="sticker-print-btn" onClick={() => navigate('/print')}></div>
               </div>               
          </div>
     );
}

export default Filter;