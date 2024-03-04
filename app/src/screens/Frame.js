import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';

function Frame() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // These would be replaced with actual images for your products
  const frames = [
    { id: 1, name: 'PHOTOSTRIP', image: require('../assets/frames/b1/photostrip.jpg'), price: '80.000 VND/1+1 ẢNH IN' },
    { id: 2, name: 'MULTIFRAME', image: require('../assets/frames/b1/multiframe.jpg'), price: '80.000 VND/1 ẢNH IN' },
  ];

  return (
    <div className="container">
      <div className="menu-bar">
        <button className="menu-button-pink active" onClick={() => navigate('/filter')}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('menu.goBack')}
        </button>
        <button className="menu-button">{t('menu.filter')}</button>
        <button className="menu-button active">{t('menu.frame')}</button>
        <button className="menu-button">{t('menu.payment')}</button>
        <button className="menu-button">{t('menu.photography')}</button>
        <button className="menu-button">{t('menu.printing')}</button>
        <button className="menu-button">{t('menu.photomong')}</button>
      </div>
      <div className="body-container">
        <div className="vertical-frame-frame left-frame-frame">
          <div className="frame-content-frame">
            <div className="header-frame">{frames[0].name}</div>
            <img src={frames[0].image} alt="Photo" className="photo-frame" />
            <button className="footer-button-frame">{frames[0].price}</button>
          </div>
        </div>
        <div className="vertical-frame-frame right-frame-frame">
          <div className="frame-content-frame">
            <div className="header-frame">{frames[1].name}</div>
            <img src={frames[1].image} alt="Photo" className="photo-frame" />
            <button className="footer-button-frame">{frames[1].price}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame;