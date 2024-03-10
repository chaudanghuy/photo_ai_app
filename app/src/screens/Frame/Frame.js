import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import strip from '../../assets/Frame/Type/fstrip.png';
import strip_click from '../../assets/Frame/Type/fstrip_click.png';
import f2cut from '../../assets/Frame/Type/f2cut.png';
import f2cut_click from '../../assets/Frame/Type/f2cut_click.png';
import f3cut from '../../assets/Frame/Type/f3cut.png';
import f3cut_click from '../../assets/Frame/Type/f3cut_click.png';
import f4cut from '../../assets/Frame/Type/f4cut.png';
import f4cut_click from '../../assets/Frame/Type/f4cut_click.png';
import fx5cut from '../../assets/Frame/Type/fx5cut.png';
import fx5cut_click from '../../assets/Frame/Type/fx5cut_click.png';
import f6cut from '../../assets/Frame/Type/f6cut.png';
import f6cut_click from '../../assets/Frame/Type/f6cut_click.png';


function Frame() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  }

  const handleMouseLeave = () => {
    setHoveredImage(null);
  }

  const goToBackground = () => {
    navigate('/frame-step-2');
  }

  return (
    <div className='frame-container'>
      <div className="go-back" onClick={() => navigate("/")}></div>
      <div className="topSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url( ${hoveredImage === strip ? strip_click : strip})` }} onMouseEnter={() => handleMouseEnter(strip)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === f2cut ? f2cut_click : f2cut})`, marginLeft: '-40%', }} onMouseEnter={() => handleMouseEnter(f2cut)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === f3cut ? f3cut_click : f3cut})`, marginLeft: '-80%' }} onMouseEnter={() => handleMouseEnter(f3cut)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === f4cut ? f4cut_click : f4cut})` }} onMouseEnter={() => handleMouseEnter(f4cut)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === fx5cut ? fx5cut_click : fx5cut})`, marginLeft: '-40%', }} onMouseEnter={() => handleMouseEnter(fx5cut)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === f6cut ? f6cut_click : f6cut})`, marginLeft: '-80%' }} onMouseEnter={() => handleMouseEnter(f6cut)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
      </div>
    </div>
  );
};

export default Frame;