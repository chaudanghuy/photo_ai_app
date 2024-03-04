import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import bigSkinSmooth from '../assets/filters/bigSkinSmooth.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import i18n from '../translations/i18n';
import Slider from '../components/Slider';

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
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [stream, setStream] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [brightness, setBrightness] = useState(50);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterEffect, setFilterEffect] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [sliderChange, setSliderChange] = useState(false);
  const [selectedOption, setSelectedOption] = useState(DEFAULT_OPTIONS[selectedOptionIndex])

  const { t } = useTranslation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const filters = [
    { id: 1, name: t('items.personality'), image: require('../assets/filters/personality.png') },
    { id: 2, name: t('items.natural'), image: require('../assets/filters/natural.png') },
    { id: 3, name: t('items.perfect'), image: require('../assets/filters/perfect.png') },
    { id: 4, name: t('items.classic'), image: require('../assets/filters/classic.png') },
    { id: 5, name: t('items.bnw'), image: require('../assets/filters/bnw.png') },
    { id: 6, name: t('items.skin'), image: require('../assets/filters/skin.png') },
  ];

  const selectedFilters = [
    { id: 1, name: t('items.personality'), image: require('../assets/filters/filterPersonality.png') },
    { id: 2, name: t('items.natural'), image: require('../assets/filters/filterNatural.png') },
    { id: 3, name: t('items.perfect'), image: require('../assets/filters/filterPerfect.png') },
    { id: 4, name: t('items.classic'), image: require('../assets/filters/filterClassic.png') },
    { id: 5, name: t('items.bnw'), image: require('../assets/filters/filterBW.png') },
    { id: 6, name: t('items.skin'), image: require('../assets/filters/filterSkin.png') },
    { id: 99, name: t('items.default'), image: require('../assets/filters/noFilter.png') },
  ];

  const selectedFilterEffects = [
    { id: 1, name: t('items.personality'), effect: 'brightness(1.2) saturate(1.1) contrast(1.1) blur(1px) hue-rotate(10deg)' },
    { id: 2, name: t('items.natural'), effect: 'sepia(0.1) hue-rotate(20deg)' },
    { id: 3, name: t('items.perfect'), effect: 'brightness(1.1) contrast(0.9) saturate(1.5) hue-rotate(330deg)' },
    { id: 4, name: t('items.classic'), effect: 'sepia(0.3) saturate(1.2) contrast(0.8)' },
    { id: 5, name: t('items.bnw'), effect: 'grayscale(1)' },
    { id: 6, name: t('items.skin'), effect: 'blur(1px) brightness(1.1) contrast(0.9) saturate(1.2) hue-rotate(5deg)' },
    { id: 99, name: t('items.default'), effect: 'none' },
  ];

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    setSelectedItem(t('filter.noFilter'));
    setSelectedFilter(selectedFilters[6].image);
  }, []);

  useEffect(() => {
    startCamera();
  }, []);

  const increaseBrightness = (e) => {
    if (brightness < 100) {
      setBrightness(brightness + 10);
    }
  };

  const decreaseBrightness = (e) => {
    if (brightness > 0) {
      setBrightness(brightness - 10);
    }
  };

  function handleSliderChange(value) {
    setSliderChange(true);
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: value }
      })
    })
  }

  function getImageStyle() {
    if (sliderChange === false && filterEffect) return { filter: filterEffect };
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    console.log('filters:', filters);

    return { filter: filters.join(' ') }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  };

  const handleItemClick = (item, index) => {
    setSliderChange(false);
    setSelectedItem(item.name);
    setSelectedFilter(selectedFilters[index].image);
    setSelectedSquare(index);
    setFilterEffect(selectedFilterEffects[index].effect);
    setSelectedOption(options[index]);
    setSelectedOptionIndex(index);
    console.log('selectedOption:', index);
  };

  return (
    <div className="container">
      <div className="menu-bar">
        <button className="menu-button-pink active" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('menu.goBack')}
        </button>
        <button className="menu-button active">{t('menu.filter')}</button>
        <button className="menu-button">{t('menu.frame')}</button>
        <button className="menu-button">{t('menu.payment')}</button>
        <button className="menu-button">{t('menu.photography')}</button>
        <button className="menu-button">{t('menu.printing')}</button>
        <button className="menu-button">{t('menu.photomong')}</button>
      </div>
      <div className="body-container">
        <div className="vertical-frame left-frame">
          <Slider min={selectedOption.range.min} max={selectedOption.range.max} value={selectedOption.value} handleChange={handleSliderChange} />
          <h3 className="brightness-text">{t('filter.intensity')}</h3>
        </div>
        <div className="horizontal-frame">
          {stream && (
            <>
              <video ref={videoRef} autoPlay muted className="video" style={getImageStyle()} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
        <div className="vertical-frame right-frame">
          <div className="right-content">
            <div className="image-container">
              <img src={selectedFilter} alt="Your Image" className="imageRight" />
            </div>
            <div className="text-container">
              <h2 className="bold-text h2Left">{selectedItem}</h2>
              <h3 className="italic-text h3Left">{t('filter.by')} Photomong</h3>
              <button className="rounded-button" onClick={() => navigate('/frame')}>{t('filter.confirm')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="image-row">
        {filters.map((item, index) => (
          <div key={item.id} className={`square ${selectedSquare === index ? 'square-selected' : ''}`} onClick={() => handleItemClick(item, index)}>
            <img src={item.image} alt={item.name} className="image" />
            <div className="text">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
