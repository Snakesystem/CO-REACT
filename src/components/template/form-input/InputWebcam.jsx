import React, { Suspense, useEffect, useState } from 'react'
import { useSweetAlert } from '../../../hooks/useSweetAlert';
import { LifeLine } from 'react-loading-indicators';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { useNavigate } from 'react-router-dom';


export default function InputWebcam() {

  const { showAlert } = useSweetAlert()
  const [camera, setCamera] = useState(null);
  const navigate = useNavigate();
  const handleTakePhoto = (dataUri) => {

    setCamera(dataUri);
  }

  useEffect(() => {
    if(camera) {
        showAlert({
            html: <img src={camera} alt="" />,
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: true
        }, 'lg',).then((result) => {
            if(result.isConfirmed) {
                localStorage.setItem('camera', camera);
                navigate("/")
            }
        });
    }
  }, [navigate, camera, showAlert]);

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  const handleClick = () => { 
    showAlert({
        html:<Suspense fallback={<LifeLine cla color="#17c1e8" size="large" text="Loading content, please wait..." textColor="#ffffff" />}>
                <Camera
                    isFullscreen = { false }
                    isImageMirror = {true}
                    imageType={ IMAGE_TYPES.JPG }
                    idealResolution = {{width: 480, height: 540}}
                    idealFacingMode = {FACING_MODES.ENVIRONMENT}
                    onCameraStop = { () => { handleCameraStop(); } } 
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                />
            </Suspense>,
        allowOutsideClick: false,
        showConfirmButton: false
    }, 'lg',);
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        <i className="bi bi-camera"></i>
      </button>
    </div>
  )
}

