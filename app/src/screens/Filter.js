import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

function Filter() {
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState('');

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', borderRadius: '10px', margin: '20px' }}>
        {/* Menu */}
        <button onClick={() => navigate('/')}>Go back</button>
        <button>Filter</button>
        <button>Frame</button>
        <button>Payment</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* First Column */}
        <div style={{ width: '20%', marginLeft: '50px' }}>
          <div>Brightness</div>
          <button>-</button>
          <input type="range" orient="vertical" />
          <button>+</button>
        </div>

        {/* Center Column */}
        {/* Webcam and Snapshot Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '60%', height: 'auto' }}
          />
        </div>

        {/* Third Column */}
        <div style={{ width: '20%' }}>
          {/* Placeholder for filter preview */}
          <div>Filter Preview</div>
        </div>
      </div>

      <div>
        {/* Filter Selection Slider */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '80%' }}>
            {/* Example filter */}
            <div style={{ width: '100px', height: '100px', backgroundColor: '#eee', margin: '10px' }}>Filter 1</div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#eee', margin: '10px' }}>Filter 2</div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#eee', margin: '10px' }}>Filter 3</div>
            {/* Add more filters as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
