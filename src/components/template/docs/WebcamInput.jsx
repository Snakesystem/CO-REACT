// src/components/WebCamInput.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Controller, useFormContext } from 'react-hook-form';

const WebCamInput = ({ ngModel }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const { control, setValue } = useFormContext();
  const [facingMode, setFacingMode] = useState('user');

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setValue(ngModel, imageSrc);
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Capture Image</h2>
      <Controller
            name={ngModel}
            control={control}
            render={({ field }) => (
                <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode }}
                  className="w-100 mb-3"
                />
                <div className="mb-3">
                  <button type="button" className="btn btn-primary me-2" onClick={captureImage}>Capture</button>
                  <button type="button" className="btn btn-secondary" onClick={toggleFacingMode}>
                    Switch Camera
                  </button>
                </div>
                {capturedImage && (
                  <div className="mb-3">
                    <img src={capturedImage} alt="Captured" className="img-thumbnail w-100" />
                  </div>
                )}
                <input
                  type="hidden"
                  {...field}
                  value={capturedImage || ''}
                />
              </>
            )}
          />
    </div>
  );
};

export default WebCamInput;
