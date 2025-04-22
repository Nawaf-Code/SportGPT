import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa'; // Import camera icon
import './BigPhoto.css';

const BigPhoto = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);
  const handleButtonClick = (direction) => {
    const links = {
      up: 'https://360tours.waq3y.sa/virtualtour/026c12ce',
      upleft: 'https://360tours.waq3y.sa/virtualtour/fb2f809a',
      down: 'https://360tours.waq3y.sa/virtualtour/ec3ac3af',
      downleft: 'https://360tours.waq3y.sa/virtualtour/105c96df',
      downdown: 'https://360tours.waq3y.sa/virtualtour/598ca564',
      left: 'https://www.google.com',
      right: 'https://www.google.com'
    };
    window.open(links[direction], '_blank');
  };




  const handleImageLoad = () => {
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight
      });
    }
  };

  

  return (
    <div 
      className="big-photo-container"
      style={{ 
        width: dimensions.width > 0 ? dimensions.width : 'auto',
        height: dimensions.height > 0 ? dimensions.height : 'auto',
        maxWidth: '1000px',
        maxHeight: '790px'
      }}
    >
      <img
        ref={imgRef}
        src="/bigPhoto.png"
        className="big-photo"
        onLoad={handleImageLoad}
        alt="Event"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px'
        }}
      />
      
      {/* Up Button with Camera Icon */}
      <button className="nav-btn up" onClick={() => handleButtonClick('up')}>
        <FaCamera className="camera-icon" />
      </button>

      <button className="nav-btn upleft" onClick={() => handleButtonClick('upleft')}>
        <FaCamera className="camera-icon" />
      </button>
      
      {/* Down Button with Camera Icon */}
      <button className="nav-btn down" onClick={() => handleButtonClick('down')}>
        <FaCamera className="camera-icon" />
      </button>

      <button className="nav-btn downleft" onClick={() => handleButtonClick('downleft')}>
        <FaCamera className="camera-icon" />
      </button>

      <button className="nav-btn downdown" onClick={() => handleButtonClick('downdown')}>
        <FaCamera className="camera-icon" />
      </button>
      
      {/* Left Button with Camera Icon 
      <button className="nav-btn left" onClick={() => handleButtonClick('left')}>
        <FaCamera className="camera-icon" />
      </button>*/}
      
      {/* Right Button with Camera Icon 
      <button className="nav-btn right" onClick={() => handleButtonClick('right')}>
        <FaCamera className="camera-icon" />
      </button>*/}
    </div>
  );
};

export default BigPhoto;