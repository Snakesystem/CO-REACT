import { ErrorMessage } from '../../../utils/utility'
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function InputNumberField(props) {

  const { ngModel, placeholder, label } = props;

  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={ngModel}>{label}</label>
      <Controller
        name={ngModel}
        control={control}
        render={({ field }) => (
          <div className="form-group mb-3">
            <div className="input-group">
            <span className="input-group-text">+62</span>
              <input
                type="text"
                id={ngModel}
                className={`form-control ${errors[ngModel] ? 'is-invalid' : ''}`}
                {...field}
                placeholder={placeholder}
              />
              <ErrorMessage ngModel={ngModel} errors={errors} />
          </div>
        </div>
        )}
      />
    </div>
  )
}

InputNumberField.propTypes = {
  ngModel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
}