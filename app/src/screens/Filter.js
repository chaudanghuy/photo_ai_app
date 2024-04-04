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
import html2canvas from 'html2canvas';
import axios from 'axios';

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
     const [percentage, setPercentage] = useState(20);
     const [options, setOptions] = useState([]);
     const [sliderChange, setSliderChange] = useState(false);
     const [filterIndex, setFilterIndex] = useState(1);

     const selectedFilterEffects = [
          {
               id: 1,
               name: 'personality',
               effect: [
                    { property: 'brightness', value: '1.2', unit: '' },
                    { property: 'saturate', value: '1.1', unit: '' },
                    { property: 'contrast', value: '1.1', unit: '' },
               ]
          },
          {
               id: 2,
               name: 'natural',
               effect: [
                    { property: 'contrast', value: '180', unit: '%' },
                    { property: 'brightness', value: '1.1', unit: '' },
               ]
          },
          {
               id: 3,
               name: 'perfect',
               effect: [
                    { property: 'staturate', value: '1.2', unit: '' },
                    { property: 'contrast', value: '1.1', unit: '' },
                    { property: 'brightness', value: '1.1', unit: '' },
               ]
          },
          {
               id: 4,
               name: 'classic',
               effect: [
                    { property: 'sepia', value: '0.3', unit: '' },
                    { property: 'saturate', value: '1.2', unit: '' },
                    { property: 'contrast', value: '0.8', unit: '' },
                    { property: 'brightness', value: '1.1', unit: '' },
               ]
          },
          {
               id: 5,
               name: 'bnw',
               effect: [
                    { property: 'grayscale', value: '1', unit: '' },
                    { property: 'brightness', value: '1.1', unit: '' },
               ]
          },
          {
               id: 6,
               name: 'skin',
               effect: [
                    { property: 'brightness', value: '1.1', unit: '' },
                    { property: 'blur', value: '1', unit: 'px' },
                    { property: 'contrast', value: '1.1', unit: '' },
                    { property: 'saturate', value: '0.8', unit: '' },
               ]
          }
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

     useEffect(() => {
          const copyImageApi = async () => {
               const sessionSelectedLayout = sessionStorage.getItem('selectedLayout');
               if (!sessionSelectedLayout) return;

               const parsedSelectedLayout = JSON.parse(sessionSelectedLayout);
               const copyImageUrl = `${process.env.REACT_APP_BACKEND}/frames/api/copy-image`;
               const copyImageData = {
                    photo_url: parsedSelectedLayout.photo,
                    photo_cover: parsedSelectedLayout.photo_cover
               };

               try {
                    const response = await fetch(copyImageUrl, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(copyImageData)
                    });
                    const data = await response.json();
                    setMyBackground(data.photo_path);
                    setSelectedLayout(data.photo_cover_path);
               } catch (error) {
                    console.error(`Failed to copy image: ${error}`);
               }
          };

          if (myBackground === null) {
               copyImageApi();
          }
     }, []);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const handleFilter = (index) => {
          setSliderChange(false);
          setPercentage(20);
          setFilterIndex(index);
          setFilterEffect(selectedFilterEffects[index].effect);
          setOptions([]);
     };

     const increasePercentage = () => {
          setSliderChange(true);
          if (percentage < 570) {
               setPercentage(percentage + 10);
          }


          if (filterEffect == null) {
               return;
          }


          if (options.length === 0) {
               let newOptions = [];
               filterEffect.forEach(effect => {
                    if (effect.property === 'brightness') {
                         effect.value = parseFloat(effect.value) + 0.01;
                         newOptions.push(effect);
                    } else {
                         newOptions.push(effect);
                    }
               });
               setOptions(newOptions);
          } else {
               let newOptions = [...options];
               newOptions = newOptions.map(option => {
                    if (option.property === 'brightness') {
                         return { ...option, value: parseFloat(option.value) + 0.01 };
                    }
                    return option;
               });
               setOptions(newOptions);
          }
     }

     const decreasePercentage = () => {
          setSliderChange(true);
          if (percentage > 10) {
               setPercentage(percentage - 10);
          }

          if (filterEffect == null) {
               return;
          }

          if (options.length === 0) {
               let newOptions = [];
               filterEffect.forEach(effect => {
                    if (effect.property === 'brightness') {
                         effect.value = parseFloat(effect.value) - 0.01;
                         newOptions.push(effect);
                    } else {
                         newOptions.push(effect);
                    }
               });
               setOptions(newOptions);
          } else {
               let newOptions = [...options];
               newOptions = newOptions.map(option => {
                    if (option.property === 'brightness') {
                         return { ...option, value: parseFloat(option.value) - 0.01 };
                    }
                    return option;
               });
               setOptions(newOptions);
          }
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
          if (filterEffect == null) {
               return '';
          }
          if (sliderChange == false) {
               const filters = filterEffect.map(option => {
                    return `${option.property}(${option.value}${option.unit})`;
               })

               return filters.join(' ')
          }

          const filters = options.map(option => {
               return `${option.property}(${option.value}${option.unit})`;
          })

          return filters.join(' ')
     }

     const storeImageCanvas = async () => {
          const element = document.getElementsByClassName('left-big-frame')[0];
          const oldBackgroundImage = element.style.backgroundImage;
          element.style.backgroundImage = 'none';
          element.style.backgroundColor = 'transparent';
          
          html2canvas(element).then(canvas => {
               const photo_data = canvas.toDataURL('image/png');
               const uploadImageUrl = `${process.env.REACT_APP_BACKEND}/frames/api/upload-full`
               
               const formData = new FormData();
               formData.append('photo', photo_data);

               axios.post(uploadImageUrl, formData, { 
                    headers: { 
                         'Content-Type': 'multipart/form-data' 
                    } 
               })
               .then(response => {
                    const data = response.data;
                    if (data.photo_url) {
                         element.style.backgroundImage = oldBackgroundImage;
                         element.style.backgroundColor = '';
                         sessionStorage.setItem('downloaded-image', data.photo_url);
                    }
               })
               .catch(error => {
                    console.error(`Failed to copy image: ${error}`);
               })
          })
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
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})`, filter: getImageStyle() }}
                                   />
                              ))}
                         </div>
                    ))
               );
          }
     }

     const goToSticker = () => {
          sessionStorage.setItem('filter', getImageStyle());
          storeImageCanvas();
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