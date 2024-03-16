import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Home.css'; // Make sure to create an appropriate CSS file for styling
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';

function App() {
  const [language, setLanguage] = useState('en');
  const [displayLanguage, setDisplayLanguage] = useState('English'); // Add other languages here
  const [showLangOption, setShowLangOption] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleChangeLanguage = (value) => {
    const selectedLanguage = value;
    setLanguage(selectedLanguage);
    sessionStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setDisplayLanguage(t(`language.${selectedLanguage}`));
  };

  const toggleShowLangOption = () => {
    setShowLangOption(!showLangOption);
  };

  return (
    <div className='home-container'>
      <div className="language-selector" onClick={toggleShowLangOption}>
        <div className="language-selector-text">{displayLanguage}</div>
        {showLangOption && 
          <div className='language-options'>
            <p className='language-text' onClick={() => handleChangeLanguage('en')}>{t('language.en')}</p>
            <p className='language-text' onClick={() => handleChangeLanguage('ko')}>{t('language.ko')}</p>
            <p className='language-text' onClick={() => handleChangeLanguage('vi')}>{t('language.vi')}</p>
          </div>
          }
      </div>
      <div className="start-button" onClick={() => navigate('/frame')}></div>      
    </div>
  );
}

export default App;
