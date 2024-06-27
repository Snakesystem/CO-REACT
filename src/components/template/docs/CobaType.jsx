import React, { useState } from 'react'
import Webcam from 'react-webcam'

export default function CobaType() {

  const [frontCamera, setFrontCamera] = useState(false)

  const switchCamera = () => {
    setFrontCamera(!frontCamera)
  }

  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: "user"
  };

  return (
    <Webcam
      audio={false}
      height={640}
      screenshotFormat="image/jpeg"
      width={480}
      videoConstraints={videoConstraints}
    >
    {({ getScreenshot }) => (
      <button
        onClick={() => {
          const imageSrc = getScreenshot()
          localStorage.setItem('gambar', imageSrc)
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>
  )
}
