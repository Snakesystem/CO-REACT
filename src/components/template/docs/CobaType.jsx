import { Webcam } from '@webcam/react'
import React, { useState } from 'react'

export default function CobaType() {

  const [frontCamera, setFrontCamera] = useState(true)

  const switchCamera = () => {
    setFrontCamera(!frontCamera)
  }

  return (
    <div><Webcam frontCamera={frontCamera}/>
    <button onClick={switchCamera} className="btn btn-primary">Ubah</button>
    </div>
  )
}
