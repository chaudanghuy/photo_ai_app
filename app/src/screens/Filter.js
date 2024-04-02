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
import plus_icon from '../assets/Filter/plus.png';
import minus_icon from '../assets/Filter/minus.png';
import intensity from '../assets/Filter/intensity.png';

const DEFAULT_OPTIONS = [
     //personality
     {
          name: 'Brightness',
          property: 'brightness',
          value: 100,
          range: {
               min: 0,
               max: 200
          },
          unit: '%'
     },
     // natural look
     {
          name: 'Contrast',
          property: 'contrast',
          value: 100,
          range: {
               min: 0,
               max: 200
          },
          unit: '%'
     },
     // perfect pink
     {
          name: 'Saturation',
          property: 'saturate',
          value: 100,
          range: {
               min: 0,
               max: 200
          },
          unit: '%'
     },
     // classic
     {
          name: 'Sepia',
          property: 'sepia',
          value: 0,
          range: {
               min: 0,
               max: 100
          },
          unit: '%'
     },
     // black and white
     {
          name: 'Grayscale',
          property: 'grayscale',
          value: 0,
          range: {
               min: 0,
               max: 100
          },
          unit: '%'
     },
     // skin smooth
     {
          name: 'Hue Rotate',
          property: 'hue-rotate',
          value: 0,
          range: {
               min: 0,
               max: 360
          },
          unit: 'deg'
     },
]

function Filter() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [filterEffect, setFilterEffect] = useState(null);
     const [myBackground, setMyBackground] = useState(null);
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [confirmButton, setConfirmButton] = useState(false);
     const [percentage, setPercentage] = useState(10);
     const [options, setOptions] = useState(DEFAULT_OPTIONS);
     const [sliderChange, setSliderChange] = useState(false);

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
               setMyBackground(parsedSelectedLayout.photo);
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

          // Retrieve selected frame from session storage
          const storedSelectedFrame = JSON.parse(sessionStorage.getItem('selectedFrame'));
          if (storedSelectedFrame) {
               setSelectedFrame(storedSelectedFrame.frame);
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

     const increasePercentage = () => {
          setSliderChange(true);
          if (percentage < 570) {
               setPercentage(percentage + 10);
          }
     }

     const decreasePercentage = () => {
          setSliderChange(true);
          setPercentage(percentage - 10);
     }     

     const displayClassNameForBackground = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-photos-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-photos-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-photos-5cut';
          } else {
               return 'left-choose-photos';
          }
     }

     const getImageStyle = () => {
          if (sliderChange == false) {
               return {filter: filterEffect};
          }

          const filters = options.map(option => {
               return `${option.property}(${option.value}${option.unit})`;
          })

          return {
               filter: filters.join(' '),               
          }
     }

     const displayClassNameForLayout = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-container-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-container-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-container-5cut';
          } else {
               return 'left-choose-container';
          }
     }

     const displayClassNameForPhoto = (rowIndex, photoIndex) => {
          if (selectedFrame === 'Stripx2' || selectedFrame === '6-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-1-1';
               } else if (rowIndex === 2 && photoIndex === 0) {
                    return 'choose-photo-item-2-0';
               } else if (rowIndex === 2 && photoIndex === 1) {
                    return 'choose-photo-item-2-1';
               } else if (rowIndex === 3 && photoIndex === 0) {
                    return 'choose-photo-item-3-0';
               } else if (rowIndex === 3 && photoIndex === 1) {
                    return 'choose-photo-item-3-1';
               }
          } else if (selectedFrame === '2cut-x2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-2cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-2cut-0-1';
               }
          } else if (selectedFrame === '3-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-3cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-1';
               }
          } else if (selectedFrame === '4-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-1-1';
               }
          } else if (selectedFrame === '5-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-1-1';
               }
          }
          return 'choose-photo-item';
     }

     const showSelectedPhotos = () => {
          if (selectedFrame == '3-cutx2' && selectedPhotos.length > 1) {
               const firstPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-3cut-top-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[0]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(1), 2);
               return (
                    [firstPhotoTpl, ...selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    ))]
               );
          } else if (selectedFrame == '5-cutx2' && selectedPhotos.length > 1) {
               const lastPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-5cut-last-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[selectedPhotos.length - 1]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(0, selectedPhotos.length - 1), 2);
               return (
                    [selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    )), lastPhotoTpl]
               );
          } else {
               const selectedPhotoRows = chunkArray(selectedPhotos, 2);
               return (
                    selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})`, getImageStyle }}
                                   />
                              ))}
                         </div>
                    ))
               );
          }
     }

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
                    <div className={displayClassNameForBackground()} style={{ backgroundImage: `url(${myBackground})` }}>
                         {showSelectedPhotos()}
                    </div>
                    <div className={displayClassNameForLayout()} style={{ backgroundImage: `url(${selectedLayout})` }}></div>
               </div>
               <div className="middle-filter">
                    <div className="pink-section" style={{ height: `${percentage}px`, maxHeight: 1000 }}></div>
               </div>
               <div className='plus-icon' style={{ backgroundImage: `url(${plus_icon})` }} onClick={() => increasePercentage()}></div>
               <div className='minus-icon' style={{ backgroundImage: `url(${minus_icon})` }} onClick={() => decreasePercentage()}></div>
               <div className='intensity-icon' style={{ backgroundImage: `url(${intensity})` }}></div>
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