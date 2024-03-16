import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Frame.css";
import seasons from '../../assets/Frame/Style/seasons.png';
import seasons_click from '../../assets/Frame/Style/seasons_click.png';
import party from '../../assets/Frame/Style/party.png';
import party_click from '../../assets/Frame/Style/party_click.png';
import cartoon from '../../assets/Frame/Style/cartoon.png';
import cartoon_click from '../../assets/Frame/Style/cartoon_click.png';
import minimalism from '../../assets/Frame/Style/minimalism.png';
import minimalism_click from '../../assets/Frame/Style/minimalism_click.png';
import collab from '../../assets/Frame/Style/collab.png';
import collab_click from '../../assets/Frame/Style/collab_click.png';

function Background() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [selectedSquare, setSelectedSquare] = useState(null);
     const [hoveredImage, setHoveredImage] = useState(null);

     const handleItemClick = (item, index) => {
          setSelectedSquare(index);
     }

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const goToLayout = (image) => {
          sessionStorage.setItem('styleBg', image);
          navigate('/frame-step-3');
     }

     return (
          <div className='style-container'>
               <div className="go-back" onClick={() => navigate("/frame")}></div>
               <div className="style-section">
                    <div className="style-column">
                         <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === seasons ? seasons_click : seasons})` }} onMouseEnter={() => handleMouseEnter(seasons)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout('season')}></div>
                    </div>
                    <div className="style-column">
                         <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === party ? party_click : party})` }} onMouseEnter={() => handleMouseEnter(party)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout('party')}></div>
                    </div>
                    <div className="style-column">
                         <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === cartoon ? cartoon_click : cartoon})` }} onMouseEnter={() => handleMouseEnter(cartoon)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout('cartoon')}></div>
                    </div>
                    <div className="style-column">
                         <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === minimalism ? minimalism_click : minimalism})` }} onMouseEnter={() => handleMouseEnter(minimalism)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout('minimalism')}></div>
                    </div>
                    <div className="style-column">
                         <div className="image-style-div" style={{ backgroundImage: `url(${hoveredImage === collab ? collab_click : collab})` }} onMouseEnter={() => handleMouseEnter(collab)} onMouseLeave={handleMouseLeave} onClick={() => goToLayout('collab')}></div>
                    </div>
               </div>
          </div>
     );
}

export default Background;