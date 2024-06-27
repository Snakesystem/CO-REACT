import { Webcam } from '@webcam/react'
import React, { useState } from 'react'

export default function CobaType() {

  const [frontCamera, setFrontCamera] = useState(false)

  const switchCamera = () => {
    setFrontCamera(!frontCamera)
  }

  console.log('frontCamera', frontCamera)

  return (
    <div><Webcam frontCamera={frontCamera}/>
    <button onClick={switchCamera} className="btn btn-primary">Ubah</button>
    </div>
  )
}
