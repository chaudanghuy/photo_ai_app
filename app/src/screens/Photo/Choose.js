import React, { useEffect, useState } from 'react';
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
     const [selectedPhotos, setSelectedPhotos] = useState([]);

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
     }, []);

     const toggleSelection = (index) => {
          const selectedIndex = selectedPhotos.indexOf(index);
          if (selectedIndex === -1) {
               // Add the photo to selectedPhotos if it's not already selected
               setSelectedPhotos([...selectedPhotos, index]);
          } else {
               // Remove the photo from selectedPhotos if it's already selected
               setSelectedPhotos(selectedPhotos.filter((item) => item !== index));
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
          navigate("/filter")
     }

     const selectedPhotoRows = chunkArray(selectedPhotos, 2);

     return (
          <div className='photo-choose-container'>
               <div className="go-back" onClick={() => navigate("/photo")}></div>
               <div className="left-big-frame">
                    <div className="left-choose-container" style={{ backgroundImage: `url(${selectedLayout})` }}></div>
                    <div className="left-choose-photos">
                         {selectedPhotoRows.map((row, rowIndex) => (
                              <div key={rowIndex} className="choose-photo-row">
                                   {row.map((selectedIndex, photoIndex) => (
                                        <div
                                             key={photoIndex}
                                             className={row.length == 1 ? 'choose-photo-item-alone' : 'choose-photo-item'}
                                             style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                        />
                                   ))}
                              </div>
                         ))}
                    </div>
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