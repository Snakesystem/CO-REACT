import React, { useState } from 'react'
import Webcam from 'react-webcam'

export default function CobaType() {

  const [frontCamera, setFrontCamera] = useState(false)

  const switchCamera = () => {
    setFrontCamera(!frontCamera)
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <Webcam
      audio={false}
      height={720}
      screenshotFormat="image/jpeg"
      width={1280}
      videoConstraints={videoConstraints}
    >
    {({ getScreenshot }) => (
      <button
        onClick={() => {
          const imageSrc = getScreenshot()
          console.log('firstName', imageSrc)
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>
  )
}
