import React, { useState, useEffect } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

const CameraComponent = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODES.USER);

  useEffect(() => {
    // Check if the device has multiple cameras and adjust accordingly
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      if (videoDevices.length > 1) {
        setFacingMode(FACING_MODES.USER);
      } else {
        setFacingMode(FACING_MODES.ENVIRONMENT);
      }
    });
  }, []);

  const handleTakePhoto = (dataUri) => {
    console.log('Foto diambil: ', dataUri);
  };

  const switchFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === FACING_MODES.USER ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER
    );
  };

  return (
    <div>
      <Camera
        onTakePhoto={handleTakePhoto}
        idealFacingMode={facingMode}
        idealResolution={{ width: 640, height: 480 }}
        imageType={IMAGE_TYPES.JPG}
        imageCompression={0.97}
        isMaxResolution={true}
        isImageMirror={facingMode === FACING_MODES.USER}
        isSilentMode={false}
        isDisplayStartCameraError={true}
        isFullscreen={false}
        sizeFactor={1}
      />
      <button onClick={switchFacingMode}>
        Switch to {facingMode === FACING_MODES.USER ? 'Back' : 'Front'} Camera
      </button>
    </div>
  );
};

export default CameraComponent;
