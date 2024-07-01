// CaptureImageInput.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useFormContext, Controller } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';

const WebCam = ({ name }) => {
  const { control } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');
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
              <Button variant="secondary" onClick={handleShow}>
                Open Camera
              </Button>
            )}
            <input type="hidden" {...field} value={capturedImage || ''} />
          </div>
        )}
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Take a Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={capture}>
            Capture
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WebCam;
