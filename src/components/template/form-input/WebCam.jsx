// CaptureImageInput.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useFormContext, Controller } from 'react-hook-form';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import './styles.scss'; // Pastikan untuk mengimpor file gaya Anda

const CaptureImageInput = ({ name }) => {
  const { control } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // default to front camera
  const webcamRef = useRef(null);

  const handleShow = () => setShowModal(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    handleClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleClose = () => {
    setShowModal(false);
    setCapturedImage(null); // Reset captured image when modal closes
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {capturedImage ? (
              <img src={capturedImage} alt="Captured" width="100%" />
            ) : (
              <button type="button" className="btn btn-secondary" onClick={handleShow}>
                Open Camera
              </button>
            )}
            <input type="hidden" {...field} value={capturedImage || ''} />
          </div>
        )}
      />

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-fullscreen-mobile" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="webcam-container">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode }}
                    className="webcam-video"
                  />
                  <div className="modal-footer">
                    <button type="button" className="btn" onClick={handleClose}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <button type="button" className="btn" onClick={capture}>
                      <i className="bi bi-camera"></i>
                    </button>
                    <button type="button" className="btn" onClick={toggleFacingMode}>
                      <i className="bi bi-arrow-repeat"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureImageInput;
