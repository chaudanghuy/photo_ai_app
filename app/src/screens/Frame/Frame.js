import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import strip from '../../assets/Frame/Type/strip.png';
import strip_unclick from '../../assets/Frame/Type/strip_unclick.png';
import f2cut from '../../assets/Frame/Type/f2cut.png';
import f2cut_unclick from '../../assets/Frame/Type/f2cut_unclick.png';
import f3cut from '../../assets/Frame/Type/f3cut.png';
import f3cut_unclick from '../../assets/Frame/Type/f3cut_unclick.png';
import f4cut from '../../assets/Frame/Type/f4cut.png';
import f4cut_unclick from '../../assets/Frame/Type/f4cut_unclick.png';
import f5cut from '../../assets/Frame/Type/f5cut.png';
import f5cut_unclick from '../../assets/Frame/Type/f5cut_unclick.png';
import f6cut from '../../assets/Frame/Type/f6cut.png';
import f6cut_unclick from '../../assets/Frame/Type/f6cut_unclick.png';


function Frame() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className='frame-container'>
      <div className="go-back" onClick={() => navigate("/")}></div>
      <div className="topSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url( ${strip})` }}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${f2cut})` }}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${f3cut})` }}></div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${f4cut})` }}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url({${f5cut})` }}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${f6cut})` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Frame;