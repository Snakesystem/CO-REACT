// CaptureImageInput.js
import { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Webcam from 'react-webcam';

const ModalWebcam = (props) => {

  const { showModal, capturedImage, extentions, facingMode, webcamRef, handleRetake, handleClose, uploadImage, capture, toggleFacingMode } = props;

  return (
    <Modal show={showModal} onHide={handleClose} className="modal-fullscreen-mobile">
      <div className="modal-content">
        <div className="modal-body">
          <div className="webcam-container">
            {capturedImage ? <img className='webcam-image' src={capturedImage} alt="Captured" width="100%" /> : (
              <Webcam
              audio={false}
              ref={webcamRef}
              screenshotQuality={0.92}
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
    </Modal>
  )
}

const WebcamPro = (props) => {

  const { extentions, screenShot } = props;

  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState({
    width: 480,
    height: 640,
  });
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // default to front camera
  const webcamRef = useRef(null);

  useEffect(() => {
    if(window.innerWidth < 776) {
      setDevice({ width: 480, height: 640 });
    } else {
      setDevice({ width: 640, height: 480 });
    }
  }, [setDevice]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showModal && event.key === 'Backspace') {
        event.preventDefault();
        handleClose();
      }
    };
 
    const handleOrientationChange = () => {
      const video = webcamRef.current.video;
      if (video) {
        if (window.orientation === 90 || window.orientation === -90) {
          video.style.transform = 'rotate(90deg)';
        } else {
          video.style.transform = 'rotate(0deg)';
        }
      }
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [showModal]);

  const handleShow = () => setShowModal(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(device);
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
      <div style={{cursor: 'pointer'}} className='bi bi-camera img-fluid fs-3 text-primary' onClick={handleShow}/>
      <ModalWebcam 
        facingMode={facingMode} 
        showModal={showModal}
        webcamRef={webcamRef} 
        capture={capture} 
        toggleFacingMode={toggleFacingMode} 
        handleClose={handleClose} 
        handleRetake={handleRetake} 
        uploadImage={uploadImage} 
        capturedImage={capturedImage} 
        extentions={extentions}  
      />
    </div>
  );
};

export default WebcamPro;