import React from 'react'
import Webcam from "react-webcam";
import { useSweetAlert } from '../../../hooks/useSweetAlert';

export default function InputFileUpload() {

  const { showAlert } = useSweetAlert()

  const handleClick = () => {
    showAlert({
      title: 'Title',
      html: <Webcam/>,
      icon: 'success',
      confirmButtonText: 'Ok'
    }, 'lg',);
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">Pencet</button>
    </div>
  )
}
