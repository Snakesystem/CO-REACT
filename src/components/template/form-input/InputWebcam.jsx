import React, { Suspense, useEffect, useState } from 'react'
import { useSweetAlert } from '../../../hooks/useSweetAlert';
import { LifeLine } from 'react-loading-indicators';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { useNavigate } from 'react-router-dom';


export default function InputWebcam() {

  const { showAlert } = useSweetAlert()
  const [camera, setCamera] = useState(null);
  const [facingMode, setFacingMode] = useState(FACING_MODES.USER);
  const navigate = useNavigate();
  const handleTakePhoto = (dataUri) => {

    setCamera(dataUri);
  }

  const switchFacingMode = () => {
    setFacingMode(FACING_MODES.ENVIRONMENT)
  };

  const switchFacingModeOk = () => {
    setFacingMode(FACING_MODES.ENVIRONMENT)
  };

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
                    onTakePhoto={handleTakePhoto}
                    idealFacingMode={FACING_MODES.USER}
                    idealResolution={{width: 480, height: 540}}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={true}
                    // isImageMirror={facingMode === FACING_MODES.USER}
                    isSilentMode={false}
                    isDisplayStartCameraError={true}
                    isFullscreen={false}
                    sizeFactor={1}
                />
                <button onClick={switchFacingMode}>
                  Switch to BankCamera
                </button>
                <button onClick={switchFacingModeOk}>
                  Switch to Front Camera
                </button>
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

