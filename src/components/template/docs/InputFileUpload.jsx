import React, { useState, useEffect } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

const CameraComponent = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODES.USER);
  const [deviceId, setDeviceId] = useState(null);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const nameCamera = videoDevices.find(device => device.label.toLowerCase());
      setDeviceId(nameCamera.label);
    })
  }, [])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front'));
      const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));

      console.log('videoDevices', videoDevices)
      console.log('frontCamera', frontCamera)
      console.log('backCamera', backCamera)

      if (frontCamera) {
        setDeviceId(frontCamera.deviceId);
        setFacingMode(FACING_MODES.USER);
      } else if (backCamera) {
        setDeviceId(backCamera.deviceId);
        setFacingMode(FACING_MODES.ENVIRONMENT);
      }
    });
  }, []);

  const handleTakePhoto = (dataUri) => {
    console.log('Foto diambil: ', dataUri);
  };

  console.log('deviceId', deviceId)

  const switchFacingMode = () => {
    setFacingMode((prevMode) => {
      const newMode = prevMode === FACING_MODES.USER ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER;
      // const newDeviceId = videoDevices.find(device => {
      //   return device.label.toLowerCase().includes(newMode === FACING_MODES.USER ? 'front' : 'back');
      // }).deviceId;

      // setDeviceId(newDeviceId);
      return newMode;
    });
  };

  return (
    <div>
      {deviceId && (
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
          videoConstraints={{
            deviceId: { exact: deviceId }
          }}
        />
      )}
      <button onClick={switchFacingMode}>
        Switch to {facingMode === FACING_MODES.USER ? 'Back' : 'Front'} Camera
      </button>
    </div>
  );
};

export default CameraComponent;
