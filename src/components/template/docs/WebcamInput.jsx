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
  const [showPreview, setShowPreview] = useState(false);
  const MySwal = withReactContent(Swal);

  const isMobile = window.innerWidth <= 768;

  const videoConstraints = isMobile
    ? {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode,
      }
    : {
        width: 480,
        height: 640,
        facingMode,
      };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 480,
      height: 640,
    });
    setCapturedImage(imageSrc);
    setValue('webcam', imageSrc); // Set value in react-hook-form
    setShowPreview(true); // Menampilkan preview setelah capture
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleUpload = () => {
    // Implementasi logika untuk mengunggah gambar
    console.log('Uploading image:', capturedImage);
    setCapturedImage(null);
    setShowPreview(false);
    MySwal.close();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowPreview(false);
    MySwal.fire({
      html: (
        <div className="swal-cover">
          <div className="cover-top"></div>
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className={`webcam-video ${isMobile ? 'mobile' : 'desktop'}`}
            />
            <div className="webcam-controls">
              <button type="button" className="btn btn-primary me-2 webcam-button" onClick={captureImage}>
                <i className="bi bi-camera"></i>
              </button>
              <button type="button" className="btn btn-secondary webcam-button" onClick={toggleFacingMode}>
                <i className="bi bi-arrow-repeat"></i>
              </button>
              <button type="button" className="btn btn-danger webcam-button" onClick={() => MySwal.close()}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div className="cover-bottom"></div>
        </div>
      ),
      showConfirmButton: false,
      customClass: {
        popup: 'swal2-popup',
        container: 'swal2-container',
        content: 'swal2-content',
      },
      backdrop: 'rgba(0,0,0,0.9)',
      heightAuto: false,
      padding: 0,
      margin: 0,
    });
  };

  useEffect(() => {
    if (showPreview && capturedImage) {
      MySwal.fire({
        html: (
          <div className="swal-preview">
            <img src={capturedImage} alt="Captured" className="img-thumbnail w-100" />
            <div className="preview-buttons mt-3">
              <button className="btn btn-primary me-2" onClick={handleUpload}>
                Upload
              </button>
              <button className="btn btn-secondary me-2" onClick={handleRetake}>
                Retake
              </button>
              <button className="btn btn-danger" onClick={() => MySwal.close()}>
                Close
              </button>
            </div>
          </div>
        ),
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-popup',
          container: 'swal2-container',
          content: 'swal2-content',
        },
        backdrop: 'rgba(0,0,0,0.9)',
        heightAuto: false,
        padding: 0,
        margin: 0,
      });
    }
  }, [showPreview, capturedImage]);

  useEffect(() => {
    if (!capturedImage) {
      MySwal.fire({
        html: (
          <div className="swal-cover">
            <div className="cover-top"></div>
            <div className="webcam-container">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={`webcam-video ${isMobile ? 'mobile' : 'desktop'}`}
              />
              <div className="webcam-controls">
                <button type="button" className="btn btn-primary me-2 webcam-button" onClick={captureImage}>
                  <i className="bi bi-camera"></i>
                </button>
                <button type="button" className="btn btn-secondary webcam-button" onClick={toggleFacingMode}>
                  <i className="bi bi-arrow-repeat"></i>
                </button>
                <button type="button" className="btn btn-danger webcam-button" onClick={() => MySwal.close()}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div className="cover-bottom"></div>
          </div>
        ),
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-popup',
          container: 'swal2-container',
          content: 'swal2-content',
        },
        backdrop: 'rgba(0,0,0,0.9)',
        heightAuto: false,
        padding: 0,
        margin: 0,
      });
    }
  }, [facingMode]);

  return (
    <div className="form-group mb-3">
      <label htmlFor="webcam" className="form-label">Webcam</label>
      <Controller
        name="webcam"
        control={control}
        render={({ field }) => (
          <>
            <input type="hidden" {...field} value={capturedImage || ''} />
          </>
        )}
      />
    </div>
  );
};

export default WebCamInput;
