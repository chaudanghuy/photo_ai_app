import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Filter.css";
import photo_frame from '../assets/Filter/photo_frame.png';
import filter from '../assets/Filter/filter.png';
import filter_hover from '../assets/Filter/filter_hover.png';
import personal from '../assets/Filter/personal.png';
import personal_click from '../assets/Filter/personal_click.png';
import natural from '../assets/Filter/natural.png';
import natural_click from '../assets/Filter/natural_click.png';
import pink from '../assets/Filter/pink.png';
import pink_click from '../assets/Filter/pink_click.png';
import classic from '../assets/Filter/classic.png';
import classic_click from '../assets/Filter/classic_click.png';
import bnw from '../assets/Filter/bnw.png';
import bnw_click from '../assets/Filter/bnw_click.png';
import smooth from '../assets/Filter/smooth.png';
import smooth_click from '../assets/Filter/smooth_click.png';
import continue_btn from '../assets/Filter/continue_btn.png';
import continue_btn_click from '../assets/Filter/continue_btn_click.png';

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
          <div className='filter-container'>
               <div className="go-back" onClick={() => navigate("/photo")}></div>
               <div className="left-big-frame">
                    <div className="left-filter" style={{ backgroundImage: `url(${photo_frame})` }}>                         
                    </div>
               </div>
               <div className="middle-filter" style={{ backgroundImage: `url(${filter_hover})` }}>
               </div>
               <div className="right-filter">
                    <div className="filter-line">
                         <div className="filter-image" style={{ backgroundImage: `url(${personal})` }}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${natural})` }}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${pink})` }}></div>
                    </div>
                    <div className="filter-line">
                         <div className="filter-image" style={{ backgroundImage: `url(${classic})` }}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${bnw})` }}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${smooth})` }}></div>
                    </div>
               </div>
               <div className="bottom-filter" style={{ backgroundImage: `url(${continue_btn})` }} onClick={() => navigate('/sticker')}></div>
          </div>
     );
}

export default Filter;