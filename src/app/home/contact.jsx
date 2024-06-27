import React from 'react'
import { useSweetAlert } from '../../hooks/useSweetAlert';

export default function Contact() {

  const { showAlert } = useSweetAlert()

  const handleButtonClick = () => {
    showAlert({
      title: "Success cuy",
      html: <span>This is a custom SweetAlert2 alert using React Context!</span>,
      icon: 'success',
      allowOutsideClick: false,
      confirmButtonText: 'Cool'
    }, 'xl',
      'default-popup-background',
      'default-backdrop');
  };

  return (
    <div className="custom-wal">
      <button onClick={() => handleButtonClick()} className="btn btn-info">Munculkan</button>
    </div>
  )
}
