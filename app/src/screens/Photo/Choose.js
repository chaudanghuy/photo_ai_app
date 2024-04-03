import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Photo.css";
import continue_btn from '../../assets/Photo/Choose/continue_btn.png';
import continue_btn_click from '../../assets/Photo/Choose/continue_btn_click.png';
import photo_frame from '../../assets/Photo/Choose/photo_frame.png';

function Choose() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [myBackground, setMyBackground] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [confirmButton, setConfirmButton] = useState(false);
     const parentRef = useRef(null);

     const photos = JSON.parse(sessionStorage.getItem('photos'));
     // Split photos into arrays of 4 photos each
     const photoGroups = [];
     for (let i = 0; i < photos.length; i += 4) {
          photoGroups.push(photos.slice(i, i + 4));
     }

     const chunkArray = (arr, size) => {
          return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
     };


     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
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

     const toggleSelection = (index) => {
          // Determine total photos
          let totalMeetsPhotos = 0;
          if (selectedFrame == 'Stripx2') {
               totalMeetsPhotos = 8;
          } else if (selectedFrame == '2cut-x2') {
               totalMeetsPhotos = 2;
          } else if (selectedFrame == '3-cutx2') {
               totalMeetsPhotos = 3;
          } else if (selectedFrame == '4-cutx2') {
               totalMeetsPhotos = 4;
          } else if (selectedFrame == '5-cutx2') {
               totalMeetsPhotos = 5;
          } else if (selectedFrame == '6-cutx2') {
               totalMeetsPhotos = 6;
          }

          const selectedIndex = selectedPhotos.indexOf(index);
          if (selectedIndex === -1 && selectedPhotos.length < totalMeetsPhotos) {
               // Add the photo to selectedPhotos if it's not already selected
               setSelectedPhotos([...selectedPhotos, index]);
          } else {
               // Remove the photo from selectedPhotos if it's already selected
               setSelectedPhotos(selectedPhotos.filter((item) => item !== index));
          }

          // Check if all photos have been selected
          if (selectedPhotos.length === totalMeetsPhotos - 1) {
               setConfirmButton(true);
          } else {
               setConfirmButton(false);
          }
     };

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const goToFilter = () => {
          sessionStorage.setItem('choosePhotos', JSON.stringify(selectedPhotos));

          // Determine total photos
          let totalMeetsPhotos = 0;
          if (selectedFrame == 'Stripx2') {
               totalMeetsPhotos = 8;
          } else if (selectedFrame == '2cut-x2') {
               totalMeetsPhotos = 2;
          } else if (selectedFrame == '3-cutx2') {
               totalMeetsPhotos = 3;
          } else if (selectedFrame == '4-cutx2') {
               totalMeetsPhotos = 4;
          } else if (selectedFrame == '5-cutx2') {
               totalMeetsPhotos = 5;
          } else if (selectedFrame == '6-cutx2') {
               totalMeetsPhotos = 6;
          }

          if (selectedPhotos.length === totalMeetsPhotos) {
               navigate("/filter")
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
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    ))
               );
          }
     }

     return (
          <div className='photo-choose-container'>
               <div className="go-back" onClick={() => navigate("/photo")}></div>
               <div className="left-big-frame">
                    <div ref={parentRef} className={displayClassNameForBackground()} style={{ backgroundImage: `url(${myBackground})` }}>
                         {showSelectedPhotos()}
                    </div>
                    <div className={displayClassNameForLayout()} style={{ backgroundImage: `url(${selectedLayout})` }}></div>
               </div>
               <div className="right-choose-container">
                    {photoGroups.map((group, index) => (
                         <div key={index} className="choose-line">
                              {group.map((photo, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className="choose-image"
                                        style={{ backgroundImage: `url(${photo.url})` }}
                                        onClick={() => toggleSelection(photo.id)}
                                   />
                              ))}
                         </div>
                    ))}
               </div>
               <div
                    className="bottom_choose_container"
                    style={{ backgroundImage: `url(${hoveredImage === continue_btn ? continue_btn_click : continue_btn})` }}
                    onMouseEnter={() => handleMouseEnter(continue_btn)}
                    onMouseLeave={handleMouseLeave}
                    onClick={goToFilter}
               ></div>
          </div>
     );
}

export default Choose;