import React, { useState, useRef, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import './CameraCapture.scss';

const CameraCapture = () => {
  const { control, setValue } = useFormContext();
  const [facingMode, setFacingMode] = useState('user');
  const webcamRef = useRef(null);

  const openCamera = () => {
    Swal.fire({
      title: 'Camera Feed',
      html: `<div class="swal-webcam-container"><video id="swal-webcam" autoplay playsinline></video></div>`,
      showCancelButton: true,
      showConfirmButton: false,
      willOpen: () => {
        const video = document.getElementById('swal-webcam');
        if (webcamRef.current && video) {
          const stream = webcamRef.current.video.srcObject;
          video.srcObject = stream;
        }
      },
    });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    Swal.fire({
      title: 'Captured Image',
      html: `<img src="${imageSrc}" alt="Captured Image" style="width: 100%; height: auto;"/>`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: '<i class="bi bi-camera"></i> Retake Photo',
      focusConfirm: false,
      preConfirm: () => {
        setValue('capturedImage', imageSrc);
      },
    }).then((result) => {
      if (result.isDismissed) {
        openCamera();
      }
    });
  };

  const switchFacingMode = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
  };

  const closeCamera = () => {
    Swal.close();
  };

  useEffect(() => {
    openCamera();
  }, []);

  return (
    <div className="camera-capture">
      <Controller
        name="webcam"
        control={control}
        render={() => (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            className="webcam-video"
          />
        )}
      />
      <div className="button-group">
        <button type="button" className="btn btn-primary me-2" onClick={captureImage}>
          <i className="bi bi-camera"></i>
        </button>
        <button type="button" className="btn btn-secondary me-2" onClick={switchFacingMode}>
          <i className="bi bi-arrow-repeat"></i>
        </button>
        <button type="button" className="btn btn-danger" onClick={closeCamera}>
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
