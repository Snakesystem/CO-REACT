import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage, LoadingSkeleton, createOptions } from '../../../utils/utility';
import { toast } from 'react-toastify';
import { useLoadingApi } from '../../../hooks/useLoadingApi';

const ListCheckBox = (props) => {

    const { ngModel, options, optionKey, optionValue, label, mode="vertical" } = props;
    const { control, formState: { errors } } = useFormContext();
    const { isLoading } = useLoadingApi();

    useEffect(() => {

      if(options === undefined) {
        toast.error(`At ${ngModel} options not null`);
      } else if(typeof options !== 'object') {
        toast.error(`At ${ngModel} options has been object array`);
      } 

      if(optionKey === undefined) {
        toast.error(`At ${ngModel} optionKey not null`);
      }

      if(optionValue === undefined) {
        toast.error(` At ${ngModel} optionValue not null`);
      }

    }, [ngModel, optionKey, optionValue, options]);

    const fieldOptions = createOptions(options, optionKey, optionValue);

    return (
      <div className="mb-3">
        <label htmlFor={ngModel} className="form-label">{label}</label>
        <div className={mode === "vertical" ? "card card-checkbox" : "border p-2"}>
          {isLoading ? <LoadingSkeleton count={1} /> : fieldOptions && fieldOptions.map(({ optionKey, optionValue }) => (
            <div key={optionKey} className="form-check form-check-inline">
              <Controller
                name={ngModel}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`${ngModel}-${optionKey}`}
                      value={optionKey}
                      checked={value.includes(optionKey)} 
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange([...value, optionKey]);
                        } else {
                          onChange(value.filter((val) => val !== optionKey));
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={`${ngModel}-${optionKey}`}>
                      {optionValue}
                    </label>
                  </>
                )}
              />
            </div>
          ))}
        </div>
        <ErrorMessage ngModel={ngModel} errors={errors} />
    </div>
    )
}  

const RadioCheckBox = (props) => {

    const { ngModel, optionValue, label } = props;
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="mb-3">
            <div className="form-check form-check-inline">
            <Controller
                name={ngModel}
                control={control}
                render={({ field }) => (
                    <input
                    id={ngModel}      
                    type="radio"
                    {...field}
                    value={optionValue}
                    checked={field.value === optionValue}
                    className={`form-check-input ${errors[ngModel] ? 'is-invalid' : ''}`}
                    />
                    )}
                />
                <label className="form-check-label" htmlFor={ngModel}>
                    {label}
                </label>
            </div>
            <ErrorMessage ngModel={ngModel} errors={errors} />
        </div>
    )
}  

const SingleCheckBox = (props) => {

    const { ngModel, placeholder, label } = props;
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="mb-3">
            <div className="form-check">
                <Controller
                    name={ngModel}
                    control={control}
                    render={({ field }) => (
                        <input
                        id={ngModel}      
                        type="checkbox"
                        {...field}
                        className={`form-check-input ${errors[ngModel] ? 'is-invalid' : ''}`}
                        aria-describedby={ngModel}
                        placeholder={placeholder}
                        />
                    )}
                />
                <label className="form-check-label" htmlFor={ngModel}>
                    {label}
                </label>
            </div>
            <ErrorMessage ngModel={ngModel} errors={errors} />
        </div>
    )
}

export default function InputCheckBoxField(props) {

    const { ngModel, placeholder, type, optionValue, options, optionKey, label, mode } = props;

    let component = null;

    switch(type) {
        case "radio": 
            component = <RadioCheckBox ngModel={ngModel} placeholder={placeholder} optionValue={optionValue} label={label} />
            break;
        case "checkbox-list": 
            component = <ListCheckBox ngModel={ngModel} placeholder={placeholder} options={options} optionKey={optionKey} optionValue={optionValue} label={label} mode={mode} />
            break;
        default:
            component = <SingleCheckBox ngModel={ngModel} placeholder={placeholder} label={label} />
    }
    

  return component
}

InputCheckBoxField.propTypes = {
    ngModel: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    optionValue: PropTypes.string,
    options: PropTypes.array,
    optionKey: PropTypes.string,
    label: PropTypes.string,
    mode: PropTypes.string
}