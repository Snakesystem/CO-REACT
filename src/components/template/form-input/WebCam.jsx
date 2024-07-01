import React, { useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSweetAlert } from '../../../hooks/useSweetAlert';

const VideoCam = ({webcamRef, videoConstraints, toggleFacingMode}) => {
    return (
        <div className="swal-cover">
            <div className="cover-top"></div>
                <div className="webcam-container">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className={`webcam-video`}
                />
                <div className="webcam-controls">
                    <button type="button" className="btn btn-primary me-2 webcam-button" >
                    <i className="bi bi-camera"></i>
                    </button>
                    <button type="button" className="btn btn-secondary webcam-button" onClick={toggleFacingMode}>
                    <i className="bi bi-arrow-repeat"></i>
                    </button>
                    <button type="button" className="btn btn-danger webcam-button">
                    <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                </div>
            <div className="cover-bottom"></div>
        </div>
    )
}

export default function WebCam() {

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [facingMode, setFacingMode] = useState('user');
    const [showPreview, setShowPreview] = useState(false);
    const MySwal = withReactContent(Swal);
    const { showAlert } = useSweetAlert();

    const { control, setValue } = useFormContext();

    const videoConstraints = {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode,
    };

    const toggleFacingMode = () => {
      setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
    };

    const openCamera = () => {
        showAlert({
            html: <VideoCam webcamRef={webcamRef} videoConstraints={videoConstraints} toggleFacingMode={toggleFacingMode}/>,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false
        })
    }

  return (
    <div className="form-group mb-3">
      <button type="button" className='btn btn-primary' onClick={openCamera}><i className="bi bi-camera"></i></button>
      {/* <VideoCam webcamRef={webcamRef} videoConstraints={videoConstraints}/> */}
      
      <Controller
        name="webcam"
        control={control}
        render={({ field }) => (
          <>
            <input type="hidden" {...field} />
          </>
        )}
      />
    </div>
  )
}