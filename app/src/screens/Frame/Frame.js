import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';

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
    </div>
  );
};

export default Frame;