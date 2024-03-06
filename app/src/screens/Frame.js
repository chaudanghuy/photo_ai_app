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

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  // These would be replaced with actual images for your products  

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
        <div className="image-line">
          <ImageBox header="Image 1" price="$19.99" imageUrl={folderIMG} />
          <ImageBox header="Image 2" price="$24.99" imageUrl="https://placehold.co/400" />
          <ImageBox header="Image 3" price="$29.99" imageUrl="https://placehold.co/400" />
        </div>
      </div>
    </div>
  );
};

const ImageBox = ({ header, price, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`image-box ${isDragging ? 'dragging' : ''}`}>
      <div className="image-header">{header}</div>
      
      <div className="image-price">{price}</div>
    </div>
  );
};

export default Frame;