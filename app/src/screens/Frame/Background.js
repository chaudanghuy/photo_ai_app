import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../css/App.css';

function Background() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [selectedSquare, setSelectedSquare] = useState(null);

     const filters = [
          { id: 1, name: 'Seasons', image: 'https://placehold.co/500' },
          { id: 2, name: 'Party', image: 'https://placehold.co/500' },
          { id: 3, name: 'Cartoon', image: 'https://placehold.co/500' },
          { id: 4, name: 'Minimalism', image: 'https://placehold.co/500' },
          { id: 5, name: 'Collab', image: 'https://placehold.co/500' },          
     ];

     const handleItemClick = (item, index) => {
          setSelectedSquare(index);
     }

     return (
          <div className='container'>
               <div className="menu-bar">
                    <button className="menu-button-pink active" onClick={() => navigate('/frame')}>
                         <FontAwesomeIcon icon={faArrowLeft} /> {t('menu.goBack')}
                    </button>
                    <button className="menu-button active">{t('menu.frame')}</button>
                    <button className="menu-button">{t('menu.payment')}</button>
                    <button className="menu-button">{t('menu.photography')}</button>
                    <button className="menu-button">{t('menu.filter')}</button>
                    <button className="menu-button">{t('menu.printing')}</button>
                    <button className="menu-button">{t('menu.photomong')}</button>
               </div>
               <div className='frame-body-container'>
                    <h1 className='title-frame-2'>Choose your favorite frame</h1>
                    <div className="frame-row">
                         <div className="image-row" onClick={() => navigate('/frame-step-2')}>
                              {filters.map((item, index) => (
                                   <div key={item.id} className={`square ${selectedSquare === index ? 'square-selected' : ''}`} onClick={() => handleItemClick(item, index)}>
                                        <img src={item.image} alt={item.name} className="image" />
                                        <div className="text">{item.name}</div>
                                   </div>
                              ))}
                         </div>
                    </div>
                    <p className="content">We will release new content including frames</p>
               </div>
          </div>
     );
}

export default Background;