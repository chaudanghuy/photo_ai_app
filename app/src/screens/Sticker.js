import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Sticker.css";
import frame from '../assets/Sticker/frame.png';
import sticker_frame from '../assets/Sticker/sticker_frame.png';
import sticker_taskbar from '../assets/Sticker/sticker_taskbar.png';
import mood from '../assets/Sticker/mood.png';
import lovely from '../assets/Sticker/lovely.png';
import cartoon from '../assets/Sticker/cartoon.png';
import y2k from '../assets/Sticker/y2k.png';
import print from '../assets/Sticker/print.png';

function Filter() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [filterEffect, setFilterEffect] = useState(null);

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

          // Retrieve selected photos from session storage
          const storedSelectedPhotos = JSON.parse(sessionStorage.getItem('choosePhotos'));
          if (storedSelectedPhotos) {
               setSelectedPhotos(storedSelectedPhotos);
          }

          // Filter
          const filterSession = sessionStorage.getItem('filter');
          if (filterSession) {
               setFilterEffect(filterSession);
          }
     }, []);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     // Chunk the selected photos array into arrays of 2 photos each
     const selectedPhotoRows = chunkArray(selectedPhotos, 2);

     return (
          <div className='sticker-container'>
               <div className="go-back" onClick={() => navigate("/filter")}></div>
               <div className="left-sticker" style={{ backgroundImage: `url(${frame})` }}>
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
               <div className="middle-sticker" style={{ backgroundImage: `url(${sticker_frame})` }}>
                    <div className="sticker-line" style={{ marginTop: '23%' }}>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
                    <div className="sticker-line">
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                         <div className="sticker"></div>
                    </div>
               </div>
               <div className="right-sticker" style={{ backgroundImage: `url(${sticker_taskbar})` }}>
                    <div className="sticker-category">
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${mood})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${lovely})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${cartoon})` }}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${y2k})` }}></div>
                    </div>
                    <div className="sticker-print-btn" onClick={() => navigate('/print')}></div>
               </div>
          </div>
     );
}

export default Filter;