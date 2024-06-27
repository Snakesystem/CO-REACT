import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PropTypes from 'prop-types';

InputCheckBoxList.propTypes = {
  type: PropTypes.string.isRequired,
  ngModel: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options:PropTypes.array
};

export default function InputCheckBoxList(props) {

  const { options, ngModel, required=false, type, classType } = props;

  const [register, watch, errors, setValue, setError, clearErrors ] = useOutletContext();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setValue(ngModel, selectedOptions);
  }, [selectedOptions, setValue, ngModel]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if(required) {
      if(value) {
        setError(ngModel, { type: 'manual', message: `${ngModel} is required` });
      } else {
        clearErrors(ngModel)
      }
    }
    setSelectedOptions((prev) => 
      prev.includes(value) ? prev.filter((opt) => opt !== value) : [...prev, value]
    );

    console.log('va', value)
  };
  const ErrorMessage = ({ ngModel, errors }) => {
    const error = errors[ngModel];
  
    if (!error) {
      return null;
    }
  
    return <div className="invalid-feedback">{error.message}</div>
  };

  return (
    <div>
      <label className="form-label mb-3" htmlFor={ngModel}>{ngModel}</label>
      <span className="card card-checkbox">
        {options.map(({optionValue, optionKey}) => (
          <div key={optionKey}>
            <div class="form-check">
              <input class="form-check-input" 
                type="checkbox" 
                checked={selectedOptions.includes(optionKey.toString())} 
                value={optionKey} 
                {...register(ngModel)}
                id={ngModel} 
                onChange={handleCheckboxChange}/>
              <label class="form-check-label" for={ngModel}>
                {optionValue}
              </label>
            </div>
          </div>
        ))}
      </span>
      <ErrorMessage ngModel={ngModel} errors={errors}/>
    </div>
  )
}
