import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../translations/i18n';
import '../../css/Payment.css';

function Payment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSquare, setSelectedSquare] = useState(null);

  const filters = [
    { id: 1, name: 'CASH', image: 'https://placehold.co/500', url: '/payment-cash' },
    { id: 2, name: 'MOMO', image: 'https://placehold.co/500', url: '/payment-momo' },
    { id: 3, name: 'ZALOPAY', image: 'https://placehold.co/500', url: '/payment-zalo'},
    { id: 4, name: 'PROMOTION CODE', image: 'https://placehold.co/500', url: '/payment-promo' },
  ];

  const handleItemClick = (item, index) => {
    setSelectedSquare(index);
    navigate(item.url);
  }

  return (
    <div className='container'>
      <div className="menu-bar">
        <button className="menu-button-pink active" onClick={() => navigate('/frame-step-2')}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('menu.goBack')}
        </button>
        <button className="menu-button">{t('menu.frame')}</button>
        <button className="menu-button active">{t('menu.payment')}</button>
        <button className="menu-button">{t('menu.photography')}</button>
        <button className="menu-button">{t('menu.filter')}</button>
        <button className="menu-button">{t('menu.printing')}</button>
        <button className="menu-button">{t('menu.photomong')}</button>
      </div>
      <div className='frame-body-container'>
        <h1 className='title-frame-2'>PLEASE SELECT A PAYMENT METHOD</h1>
        <div className="frame-row">
          <div className="image-row">
            {filters.map((item, index) => (
              <div 
                key={item.id} 
                className={`rectangle ${selectedSquare === index ? 'rectangle-selected' : ''}`} 
                onClick={() => handleItemClick(item, index)}
              >
                <img src={item.image} alt={item.name} className="image" />
                <div className="text">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;