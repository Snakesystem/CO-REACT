import React from 'react'
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ForgotPassword() {

  return (
    <div className="bg-primary">
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <MasaSiKokGitu/>
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Default checked radio
        </label>
      </div>
    </div>
  )
}

export function MasaSiKokGitu() {
  return (
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
        <Button>1</Button> <Button>2</Button> <Button>3</Button>{' '}
        <Button>4</Button>
      </ButtonGroup>
      <ButtonGroup className="me-2" aria-label="Second group">
        <Button>5</Button> <Button>6</Button> <Button>7</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Third group">
        <Button>8</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
