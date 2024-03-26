import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Filter.css";
import photo_frame from '../assets/Filter/photo_frame.png';
import filter from '../assets/Filter/filter.png';
import filter_hover from '../assets/Filter/filter_hover.png';
import personal from '../assets/Filter/personal.png';
import personal_click from '../assets/Filter/personal_click.png';
import natural from '../assets/Filter/natural.png';
import natural_click from '../assets/Filter/natural_click.png';
import pink from '../assets/Filter/pink.png';
import pink_click from '../assets/Filter/pink_click.png';
import classic from '../assets/Filter/classic.png';
import classic_click from '../assets/Filter/classic_click.png';
import bnw from '../assets/Filter/bnw.png';
import bnw_click from '../assets/Filter/bnw_click.png';
import smooth from '../assets/Filter/smooth.png';
import smooth_click from '../assets/Filter/smooth_click.png';
import continue_btn from '../assets/Filter/continue_btn.png';
import continue_btn_click from '../assets/Filter/continue_btn_click.png';

function Filter() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [filterEffect, setFilterEffect] = useState(null);

     const selectedFilterEffects = [
          { id: 1, name: 'personality', effect: 'brightness(1.2) saturate(1.1) contrast(1.1)' },
          { id: 2, name: 'natural', effect: 'contrast(180%)' },
          { id: 3, name: 'perfect', effect: 'saturate(1.2) contrast(1.1) brightness(1.1)' },
          { id: 4, name: 'classic', effect: 'sepia(0.3) saturate(1.2) contrast(0.8)' },
          { id: 5, name: 'bnw', effect: 'grayscale(1)' },
          { id: 6, name: 'skin', effect: 'blur(0.5px) brightness(1.1) contrast(1.1) saturate(0.8)' },
          { id: 99, name: 'default', effect: 'none' },
     ];

     const chunkArray = (arr, size) => {
          return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
     };

     const photos = JSON.parse(sessionStorage.getItem('photos'));

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
          }

          // get session storage selectedLayout
          const sessionSelectedLayout = sessionStorage.getItem('selectedLayout');
          if (sessionSelectedLayout) {
               const parsedSelectedLayout = JSON.parse(sessionSelectedLayout);
               setSelectedLayout(parsedSelectedLayout.photo_cover);
          }

          // Filter
          const filterSession = sessionStorage.getItem('filter');
          if (filterSession) {
               setFilterEffect(filterSession);
          }

          // Retrieve selected photos from session storage
          const storedSelectedPhotos = JSON.parse(sessionStorage.getItem('choosePhotos'));
          if (storedSelectedPhotos) {
               setSelectedPhotos(storedSelectedPhotos);
          }
     }, []);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const handleFilter = (index) => {
          setFilterEffect(selectedFilterEffects[index].effect);
     };

     const goToSticker = () => {
          sessionStorage.setItem('filter', filterEffect);
          navigate('/sticker')
     }

     // Chunk the selected photos array into arrays of 2 photos each
     const selectedPhotoRows = chunkArray(selectedPhotos, 2);

     return (
          <div className='filter-container'>
               <div className="go-back" onClick={() => navigate("/photo-choose")}></div>
               <div className="left-big-frame">
                    <div className="left-choose-container" style={{ backgroundImage: `url(${selectedLayout})` }}></div>
                    <div className="left-choose-photos">
                         {selectedPhotoRows.map((row, rowIndex) => (
                              <div key={rowIndex} className="choose-photo-row">
                                   {row.map((selectedIndex, photoIndex) => (
                                        <div
                                             key={photoIndex}
                                             className={row.length == 1 ? 'choose-photo-item-alone' : 'choose-photo-item'}
                                             style={{ backgroundImage: `url(${photos[selectedIndex].url})`, filter: filterEffect }}
                                        />
                                   ))}
                              </div>
                         ))}
                    </div>
               </div>
               <div className="middle-filter" style={{ backgroundImage: `url(${filter_hover})` }}>
               </div>
               <div className="right-filter">
                    <div className="filter-line">
                         <div className="filter-image" style={{ backgroundImage: `url(${personal})` }} onClick={() => handleFilter(0)}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${natural})` }} onClick={() => handleFilter(1)}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${pink})` }} onClick={() => handleFilter(2)}></div>
                    </div>
                    <div className="filter-line">
                         <div className="filter-image" style={{ backgroundImage: `url(${classic})` }} onClick={() => handleFilter(3)}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${bnw})` }} onClick={() => handleFilter(4)}></div>
                         <div className="filter-image" style={{ backgroundImage: `url(${smooth})` }} onClick={() => handleFilter(5)}></div>
                    </div>
               </div>
               <div className="bottom-filter" style={{ backgroundImage: `url(${continue_btn})` }} onClick={goToSticker}></div>
          </div>
     );
}

export default Filter;