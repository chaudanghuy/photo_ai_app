import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../translations/i18n';
import '../../css/Payment.css';

function PaymentCash() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSquare, setSelectedSquare] = useState(null);  

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
      </div>
    </div>
  );
}

export default PaymentCash;