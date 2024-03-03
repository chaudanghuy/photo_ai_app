import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; // Make sure to create an appropriate CSS file for styling
import { useNavigate } from 'react-router-dom';
import { StyleSheet } from 'react-native';
import photomong from '../assets/photomong.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import i18n from '../translations/i18n';

function App() {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleChangeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    sessionStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="App" style={styles.container}>
      <header className="App-header">
        {/* Language Selector */}
        <div className="language-selector">
          <select
            value={language}
            onChange={handleChangeLanguage}
            style={{ borderRadius: '10px', backgroundColor: 'pink', padding: '15px 66px', fontSize: '1.1rem' }}
          >
            <option value="en">
              <FontAwesomeIcon icon={faGlobe} /> {t('language.en')}
            </option>
            <option value="ko">
              <FontAwesomeIcon icon={faGlobe} /> {t('language.ko')}
            </option>
          </select>
        </div>

        <div className="logo-container">
          <img src={photomong} alt="Photo App Logo" style={{ width: '512px' }} />
        </div>
        <div className="start-button">
          <button onClick={() => navigate('/filter')} style={{ borderRadius: '20px', backgroundColor: 'pink', color: 'white', padding: '20px 50px', fontSize: '1.5em' }}>
            {t('home.takePhoto')}
          </button>
        </div>
      </header>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'pink',
    color: 'white',
    padding: '50px 70px',
    border: 'none',
    borderRadius: 5,
    fontSize: 50,
  },
  icon: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd', // Placeholder for the icon
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginLeft: '60px'
  }
});

export default App;
