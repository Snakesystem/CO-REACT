// src/components/WebCamInput.js
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useFormContext, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const WebCamInput = () => {
  const { control, setValue } = useFormContext();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const MySwal = withReactContent(Swal);

  const videoConstraints = {
    width: { ideal: window.innerWidth },
    height: { ideal: window.innerHeight },
    facingMode: facingMode,
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setValue('webcam', imageSrc); // Set value in react-hook-form
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    MySwal.fire({
      html: (
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-100 webcam-video"
          />
          <div className="webcam-controls">
            <button type="button" className="btn btn-primary me-2 webcam-button" onClick={captureImage}>
              <i className="bi bi-camera"></i>
            </button>
            <button type="button" className="btn btn-secondary webcam-button" onClick={toggleFacingMode}>
              <i className="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      customClass: {
        popup: 'webcam-swal-popup',
        container: 'webcam-swal-container',
      },
      backdrop: 'rgba(0,0,0,0.9)',
      heightAuto: false,
    });
  }, []);

  return (
    <div className="form-group mb-3">
      <label htmlFor="webcam" className="form-label">Webcam</label>
      <Controller
        name="webcam"
        control={control}
        render={({ field }) => (
          <>
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
