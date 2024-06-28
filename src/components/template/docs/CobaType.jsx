// CaptureImageInput.js
import React, { useState, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CaptureImageInput = ({ name }) => {
  const { control, setValue } = useFormContext();
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const MySwal = withReactContent(Swal);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
    MySwal.fire({
      title: 'Captured Image',
      imageUrl: imageSrc,
      imageAlt: 'Captured Image',
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-check-circle"></i> Confirm',
      cancelButtonText: '<i class="bi bi-camera"></i> Retake Photo',
      customClass: {
        popup: 'custom-swal',
      },
      width: '50%', // Lebar default untuk desktop
    }).then((result) => {
      if (result.isConfirmed) {
        setValue(name, imageSrc);
      } else {
        setImageData(null);
        openWebcamModal();
      }
    });
  };

  const openWebcamModal = () => {
    MySwal.fire({
      title: 'Capture Image',
      html: (
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-video"
            videoConstraints={{
              width: { min: 480, ideal: 1280, max: 3000 },
              height: { min: 640, ideal: 720, max: 4000 },
              facingMode: facingMode,
            }}
          />
          <div className="webcam-controls">
            <button
              type="button"
              className="webcam-button"
              onClick={handleCapture}
            >
              <i className="bi bi-camera"></i>
            </button>
            <button
              type="button"
              className="webcam-button"
              onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
            >
              <i className="bi bi-arrow-repeat"></i>
            </button>
            <button
              type="button"
              className="webcam-button"
              onClick={() => MySwal.close()}
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      customClass: {
        popup: 'custom-swal',
      },
      width: '50%', // Lebar default untuk desktop
    });
  };

  return (
    <div className="text-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {imageData ? (
              <img src={imageData} alt="Captured" className="img-thumbnail mb-3" />
            ) : (
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={openWebcamModal}
              >
                <i className="bi bi-camera-video"></i> Open Webcam
              </button>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CaptureImageInput;
