import React from 'react'
import { useSweetAlert } from '../../hooks/useSweetAlert';

export default function About() {

  const { showAlert } = useSweetAlert();

  const handleClick = () => {
    showAlert({
      title: 'Title',
      text: 'Text',
      icon: 'success',
      confirmButtonText: 'Ok'
    }, 'md',);
  };

  return (
    <div>
      <h1>About</h1>
      <button className="btn btn-primary" onClick={handleClick}>Pencet</button>
    </div>
  )
}
