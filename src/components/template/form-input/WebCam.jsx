// CaptureImageInput.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useFormContext, Controller } from 'react-hook-form';
// import './styles.scss'; // Pastikan untuk mengimpor file gaya Anda

const CaptureImageInput = ({ name }) => {
  const { control } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    handleClose();
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
              <div className="modal-header">
                <h5 className="modal-title">Take a Picture</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="webcam-container">
                  <Webcam
                    audio={false}
                    videoConstraints={{
                      facingMode: 'user',
                    }}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam-video"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={capture}>
                  Capture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureImageInput;
