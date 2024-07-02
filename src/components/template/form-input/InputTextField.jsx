import { useState } from 'react'
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../../../utils/utility';

export default function InputTextField(props) {

    const { ngModel, placeholder, label, type="text" } = props;
    const [showPassword, setShowPassword] = useState(false);

    const { control, formState } = useFormContext();
    const { errors } = formState;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={ngModel}>{label}</label>
      <Controller
        name={ngModel}
        control={control}
        render={({ field }) => (
            type === "text" ? <input
            id={ngModel} 
            type="text"     
            {...field}
            className={`form-control ${errors[ngModel] ? 'is-invalid' : ''}`}
            aria-describedby={ngModel}
            placeholder={placeholder}
          /> : type === "password" ? <div className="input-group">
            <input
              id={ngModel} 
              type={showPassword ? "text" : "password"}     
              {...field}
              className={`form-control ${errors[ngModel] ? 'is-invalid' : ''}`}
              aria-describedby={ngModel}
              placeholder={placeholder}
            /> <div className="input-group-append">
            <span className="input-group-text" onClick={handleShowPassword}> 
              {showPassword ? <i className="bi bi-eye"></i>: <i className="bi bi-eye-slash"></i>}
            </span>
          </div>
          <ErrorMessage ngModel={ngModel} errors={errors} />
          </div> : <div className="alert alert-danger" role="alert">
                Input type not found!
              </div>
        )}
      />
      <ErrorMessage ngModel={ngModel} errors={errors} />
    </div>
  )
}

InputTextField.propTypes = {
  ngModel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};