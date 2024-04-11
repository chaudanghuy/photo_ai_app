import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import Webcam from 'react-webcam';
import "../../css/Photo.css";
import countdownImg from '../../assets/Photo/Snap/countdown.png';
import photocountImg from '../../assets/Photo/Snap/photocount.png';
import frame from '../../assets/Photo/Snap/frame.png';


function Photo() {
     const { t } = useTranslation();
     const webcamRef = useRef(null);
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [countdown, setCountdown] = useState(3);
     const [photoCount, setPhotoCount] = useState(null);
     const [intervalId, setIntervalId] = useState(null);
     const [photos, setPhotos] = useState([]);
     const [flash, setFlash] = useState(false);

     const rightCornerDivValue = (photoCount + 1) * (1 / 8);

     const takeSnapshot = () => {
          setFlash(true);
          const imageSrc = webcamRef.current.getScreenshot();
          const newPhotoArray = [...photos, imageSrc];
          setPhotos(newPhotoArray);
          setPhotoCount(photoCount + 1);

          setTimeout(() => {
               setFlash(false);
          }, 100);

          if (photoCount === 7) {
               const photosWithIds = newPhotoArray.map((photo, index) => ({
                    id: index,
                    url: photo
               }));
               sessionStorage.setItem('photos', JSON.stringify(photosWithIds));
               navigate('/photo-choose')
          } else {
               setCountdown(3);
          }
     };

     useEffect(() => {
          const timer = setInterval(() => {
               if (countdown > 0) {
                    setCountdown(countdown - 1);
               } else {
                    takeSnapshot();
               }
          }, 1000);

          return () => clearInterval(timer); // Cleanup timer on unmount
     }, [countdown]);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     return (
          <div className={`photo-container ${flash ? ' animate' : ''}`}>
               <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
                    <div className="photo-countdown">{countdown}</div>
               </div>
               <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
                    <div className="photo-count">{photoCount}/8</div>
               </div>
               <div className="middle-photo-div" style={{ backgroundImage: `url(${frame})` }} onClick={() => navigate('/photo-choose')}>
                    <Webcam
                         audio={false}
                         ref={webcamRef}
                         screenshotFormat='image/jpeg'
                         className='photo-webcam'
                    />
               </div>
          </div>
     );
}

export default Photo;