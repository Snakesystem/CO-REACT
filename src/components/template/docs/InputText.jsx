import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { ErrorMessage, convertLabel } from '../../layout/FormLayout';

export const InputTextOther = (props) => {
  const { ngModel, type, required, disabled, pattern, patternMessage, maxLength, minLength } = props;

  const [register, watch, errors ] = useOutletContext();

  return (
    <div className="form-group mb-3">
      <label className="form-label" htmlFor={ngModel}>{convertLabel(ngModel)}</label>
      <input type="text"
        className={`form-control ${errors[ngModel] ? 'is-invalid' : 'is-valid'}`}
        {...register(ngModel, { 
          required, 
          disabled, 
          pattern: {
            value: pattern,
            message: patternMessage
          }, 
          maxLength: maxLength, 
          minLength: minLength
         })} 
        placeholder={`Please input ${ngModel}`} />  
        <ErrorMessage ngModel={ngModel} errors={errors}/>
    </div>
  )
}

export const InputTextEmail = (props) => {

  const {ngModel, type, required, classType} = props;

  const [register, watch, errors, setValue, setError, clearErrors ] = useOutletContext();

  const [localPart, setLocalPart] = useState('');
  const [domain, setDomain] = useState('@gmail.com');
  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(`${localPart}${domain}`)
  }, [localPart, domain, setEmail]);

  useEffect(() => {
    setValue(ngModel, email);
  }, [email, setValue, ngModel]);

  useEffect(() => {
    if(localPart === '') {
      setError(ngModel, { type: 'manual', message: `${ngModel} is required` });
    } else if (localPart.includes('@')) {
      if(domain !== '') {
        setError(ngModel, { type: 'manual', message: `${ngModel} Tidak boleh menggunakan @` });
      } else {
        clearErrors(ngModel)
      }
    } else if(domain === '') {
      setError(ngModel, { type: 'manual', message: `${ngModel} harus menggunakan @` });
    } else {
      clearErrors(ngModel);
    }
  }, [ngModel, clearErrors, localPart, setError, domain])

  const handleLocalPartChange = (e) => {
    const value = e.target.value;
    setLocalPart(value);
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setDomain(value);
  };

  const ErrorMessage = ({ ngModel, errors }) => {
    const error = errors[ngModel];
  
    if (!error) {
      return null;
    }
  
    return <div className="invalid-feedback">{error.message}</div>
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label" htmlFor={ngModel}>{ngModel}</label>
      <div className="input-group">
        <input type="text" className={`form-control ${errors[ngModel] ? 'is-invalid' : 'is-valid'}`} id={ngModel} 
          placeholder={`Please input ${ngModel}`}
          value={localPart}
          required={required}
          onChange={handleLocalPartChange}/>
        <Fragment>
          {domain && <span className="input-group-text">@</span>}
          <span className="input-group-text" style={{paddingLeft: "0px", paddingRight: "0px"}}>
            <select className="form-select" 
              style={{marginTop: "-6px", marginBottom: "-6px", marginLeft: "0px", marginRight: "0px"}} 
              onChange={handleDomainChange} required>
              <option value="@gmail.com">gmail.com</option>
              <option value="@yahoo.com">yahoo.com</option>
              <option value="@outlook.com">outlook.com</option>
              <option value="">Other</option>
            </select>
          </span>
        </Fragment>
        <ErrorMessage ngModel={ngModel} errors={errors}/>
      </div>
    </div>
  )
}

InputTextEmail.propTypes = {
  type: PropTypes.string.isRequired,
  ngModel: PropTypes.string.isRequired,
  required: PropTypes.bool,
  classType: PropTypes.string
};

InputTextOther.propTypes = {
  type: PropTypes.string.isRequired,
  ngModel: PropTypes.string.isRequired,
  required: PropTypes.string,
  classType: PropTypes.string,
  disabled: PropTypes.bool,
  pattern: PropTypes.any,
  patternMessage: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number
};