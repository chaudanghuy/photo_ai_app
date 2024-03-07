import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import '../css/App.css';

function Frame() {
  const { t } = useTranslation();
  const navigate = useNavigate();  

  const folderIMG = require("../assets/frames/folder2.jpg")
  const frameListRow1 = [
    { name: 'Stripx2', price: '70.000vnd', image: folderIMG },
    { name: '2-cutx2', price: '100.000vnd', image: folderIMG },
    { name: '3-cutx2', price: '100.000vnd', image: folderIMG },
  ]
  const frameListRow2 = [
    { name: '4-cutx2', price: '100.000vnd', image: folderIMG },
    { name: '5-cutx2', price: '100.000vnd', image: folderIMG },
    { name: '6-cutx2', price: '100.000vnd', image: folderIMG },
  ]

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);  

  return (
    <div className="container">
      <div className="menu-bar">
        <button className="menu-button-pink active" onClick={() => navigate('/filter')}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('menu.goBack')}
        </button>
        <button className="menu-button active">{t('menu.frame')}</button>
        <button className="menu-button">{t('menu.payment')}</button>
        <button className="menu-button">{t('menu.photography')}</button>
        <button className="menu-button">{t('menu.filter')}</button>
        <button className="menu-button">{t('menu.printing')}</button>
        <button className="menu-button">{t('menu.photomong')}</button>
      </div>
      <div className="body-container">
        <FrameBody frame1={frameListRow1} frame2={frameListRow2} />
      </div>
    </div>
  );
};

const FrameBody = ({ frame1, frame2 }) => {
  const navigate = useNavigate();      

  return (
    <div className="filter-container">
      <div className="filter-row">
        {frame1.map((item, index) => {
          return (
            <div 
              className="filter-column" 
              key={index} 
              onClick={() => navigate('/frame2')}
            >
              <h3>{item.name}</h3>
              <div className="image-container" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.price}</span>
              </div>              
            </div>
          );
        })}
      </div>
      <div className="filter-row">
        {frame2.map((item, index) => {
          return (
            <div className="filter-column" key={index}>
              <h3>{item.name}</h3>
              <div className="image-container" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Frame;