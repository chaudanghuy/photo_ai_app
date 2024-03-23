import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import axios from 'axios';


function Frame() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Frames 
  const [frameRow11, setFrameRow11] = useState([]);
  const [frameRow11Hover, setFrameRow11Hover] = useState([]);
  const [frameRow12, setFrameRow12] = useState([]);
  const [frameRow12Hover, setFrameRow12Hover] = useState([]);
  const [frameRow13, setFrameRow13] = useState([]);
  const [frameRow13Hover, setFrameRow13Hover] = useState([]);
  const [frameRow21, setFrameRow21] = useState([]);
  const [frameRow21Hover, setFrameRow21Hover] = useState([]);
  const [frameRow22, setFrameRow22] = useState([]);
  const [frameRow22Hover, setFrameRow22Hover] = useState([]);
  const [frameRow23, setFrameRow23] = useState([]);
  const [frameRow23Hover, setFrameRow23Hover] = useState([]);

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    fetchFrames();
  }, []);

  const fetchFrames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/frames/api')
      const frames = response.data

      frames.forEach(frame => {
        if (frame.position === 'row-1-1') {
          setFrameRow11('http://127.0.0.1:8000' + frame.photo);
          setFrameRow11Hover('http://127.0.0.1:8000'  + frame.photo_hover)
        }
        if (frame.position === 'row-1-2') {
          setFrameRow12('http://127.0.0.1:8000' + frame.photo);
          setFrameRow12Hover('http://127.0.0.1:8000' + frame.photo_hover);
        }
        if (frame.position === 'row-1-3') {
          setFrameRow13('http://127.0.0.1:8000' + frame.photo);
          setFrameRow13Hover('http://127.0.0.1:8000' + frame.photo_hover)
        }
        if (frame.position === 'row-2-1') {
          setFrameRow21('http://127.0.0.1:8000' + frame.photo);
          setFrameRow21Hover('http://127.0.0.1:8000' + frame.photo_hover);
        }
        if (frame.position === 'row-2-2') {
          setFrameRow22('http://127.0.0.1:8000' + frame.photo);
          setFrameRow22Hover('http://127.0.0.1:8000' + frame.photo_hover);
        }
        if (frame.position === 'row-2-3') {
          setFrameRow23('http://127.0.0.1:8000' + frame.photo);
          setFrameRow23Hover('http://127.0.0.1:8000' + frame.photo_hover);
        }
      });
    } catch (error) {
      console.error('Error fetching frames:', error);
    }
  }

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  }

  const handleMouseLeave = () => {
    setHoveredImage(null);
  }

  const goToBackground = () => {
    // save the selected frame in session storage
    sessionStorage.setItem('selectedFrame', JSON.stringify({
      frame: hoveredImage
    }))
    navigate('/frame-step-2');
  }

  return (
    <div className='frame-container'>
      <div className="go-back" onClick={() => navigate("/")}></div>
      <div className="topSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url( ${hoveredImage === frameRow11 ? frameRow11Hover : frameRow11})` }} onMouseEnter={() => handleMouseEnter(frameRow11)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === frameRow12 ? frameRow12Hover : frameRow12})`, marginLeft: '-40%', }} onMouseEnter={() => handleMouseEnter(frameRow12)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === frameRow13 ? frameRow13Hover : frameRow13})`, marginLeft: '-80%' }} onMouseEnter={() => handleMouseEnter(frameRow13)} onMouseLeave={handleMouseLeave} onClick={goToBackground}></div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === frameRow21 ? frameRow21Hover : frameRow21})` }} onMouseEnter={() => handleMouseEnter(frameRow21)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === frameRow22 ? frameRow22Hover : frameRow22})`, marginLeft: '-40%', }} onMouseEnter={() => handleMouseEnter(frameRow22)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
        <div className="column">
          <div className="imageDiv" style={{ backgroundImage: `url(${hoveredImage === frameRow23 ? frameRow23Hover : frameRow23})`, marginLeft: '-80%' }} onMouseEnter={() => handleMouseEnter(frameRow23)} onMouseLeave={() => handleMouseLeave} onClick={goToBackground}></div>
        </div>
      </div>
    </div>
  );
};

export default Frame;