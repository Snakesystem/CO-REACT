// CaptureImageInput.js
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';

const ModalWebcam = (props) => {

  const { capturedImage, extentions, facingMode, webcamRef, handleRetake, handleClose, uploadImage, capture, toggleFacingMode } = props;

  return (
    <div className={`modal show fade d-block modal-fullscreen-mobile`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="webcam-container">
              {capturedImage ? <img className='webcam-image' src={capturedImage} alt="Captured" width="100%" /> : (
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat={extentions}
                videoConstraints={{ facingMode }}
                className="webcam-video"
              />
              )}
              <div className="modal-footer">
                <button type="button" className="btn" onClick={capturedImage ? handleRetake : handleClose} aria-label="Close">
                  <i className="bi bi-x-lg"></i>
                </button>
                {capturedImage ? (<button type="button" className="btn" onClick={uploadImage} aria-label="reload">
                  <i className="bi bi-cloud-arrow-up"></i>
                </button>) : (
                  <button type="button" className="btn" onClick={capture}>
                    <i className="bi bi-camera"></i>
                  </button>
                )}
                <button type="button" className="btn" onClick={toggleFacingMode}>
                  <i className="bi bi-arrow-repeat"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WebCamPro = (props) => {

  const { extentions, screenShot } = props;

  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // default to front camera
  const webcamRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showModal && event.key === 'Backspace') {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const handleShow = () => setShowModal(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 640,
      height: 480,
    });
    setCapturedImage(imageSrc);
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowModal(true);
  };

  const uploadImage = () => {
    setShowModal(false);
    screenShot(capturedImage);
    setCapturedImage(null);
  };

  return (
    <div>
      <Link className='bi bi-camera img-fluid fs-3 text-primary' onClick={handleShow}/>

      {showModal && <ModalWebcam facingMode={facingMode} webcamRef={webcamRef} capture={capture} toggleFacingMode={toggleFacingMode} handleClose={handleClose} handleRetake={handleRetake} uploadImage={uploadImage} capturedImage={capturedImage} extentions={extentions}  />}
    </div>
  );
};

export default WebCamPro;