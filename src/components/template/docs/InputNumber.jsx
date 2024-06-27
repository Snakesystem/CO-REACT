import React, { Fragment, useEffect, useState } from 'react'

import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { convertLabel } from '../../../utils/utility';

InputNumber.propTypes = {
  type: PropTypes.string.isRequired,
  ngModel: PropTypes.string.isRequired,
  required: PropTypes.bool,
}

export default function InputNumber(props) {

  const { type, ngModel, required=false } = props;
  

  const MobilePhone = (props) => {

    const { ngModel } = props;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneRegion] = useState('+62-')
    const [mobilePhone, setMobilePhone] = useState('')

    const [register, watch, errors, setValue, setError, clearErrors ] = useOutletContext();

    useEffect(() => {
      setMobilePhone(`${phoneRegion}${phoneNumber}`)
    }, [phoneNumber, phoneRegion, setMobilePhone]);

    useEffect(() => {
      setValue(ngModel, mobilePhone);
    }, [mobilePhone, setValue, ngModel]);

    const handleInputChange = (e) => {
      const { value } = e.target;

      const regex = /^[0-9]+$/;
      if(regex.test(value)) {
        setPhoneNumber(value);
        clearErrors(ngModel)
      } else {
        setError(ngModel, { type: 'manual', message: `${ngModel} harus menggunakan number` });
      }
    };

    return (
      <div className="form-group mb-3">
        <label className="form-label" htmlFor={ngModel}>{convertLabel(ngModel)}</label>
        <div className="input-group">
          <span className="input-group-text">+62</span>
          <input
            type="text"
            className={`form-control ${errors[ngModel] ? 'is-invalid' : ''}`}
            id="phoneNumber"
            onChange={handleInputChange}
          />
        </div>
        {errors[ngModel] && <div className="invalid-feedback">{errors[ngModel].message}</div>}
      </div>
    )
  }

  const CurrencyInput = (props) => {

    const [register, watch, errors, setValue, setError, clearErrors ] = useOutletContext();
    const { ngModel } = props;

    return (
      <div className="form-group mb-3">
        <label className="form-label" htmlFor={ngModel}>{convertLabel(ngModel)}</label>
        <div className="input-group">
          <input
            type="text"
            {...register(ngModel)}
            className={`form-control ${errors[ngModel] ? 'is-invalid' : 'is-valid'}`}
            id="phoneNumber"
          />
          <span className="input-group-text">.00</span>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
        {type === 'mobile' ? <MobilePhone ngModel={ngModel} required={required} /> : <CurrencyInput ngModel={ngModel}/>}
    </Fragment>
  )
}
