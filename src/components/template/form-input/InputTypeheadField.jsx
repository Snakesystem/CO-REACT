// src/AsyncSelectForm.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { ErrorMessage, createOptions } from '../../../utils/utility';
import { useLoadingApi } from '../../../hooks/useLoadingApi';
import { useApi } from '../../../hooks/useApi';
import { toast } from 'react-toastify';

const InputTypeheadField = (props) => {
  const { ngModel, label, placeholder, optionKey, optionValue, minLength=2, urlLookup, disabled=false, optionObject } = props;
  const { control, formState: { errors }, getValues } = useFormContext();
  const { isLoading } = useLoadingApi();
  const [options, setOptions] = useState([]);
  const { getRequest } = useApi();
  const defValue = getValues(ngModel)

  useEffect(() => {

    if(options === undefined) {
      toast.error(`At ${ngModel} options not null`);
    } else if(typeof options !== 'object') {
      toast.error(`At ${ngModel} options not object array`);
    } 

    if(optionKey === undefined) {
      toast.error(`At ${ngModel} optionKey not null`);
    }

    if(optionValue === undefined) {
      toast.error(` At ${ngModel} optionValue not null`);
    }

    if(urlLookup === undefined) {
      toast.error(` At ${ngModel} valueKey not null`);
    }
  }, [ngModel, optionKey, optionValue, urlLookup, options]);

  const getOptions = async (query) => {
    
    try {
      const response = await getRequest(`${urlLookup}?q=${query}`);
      if(optionObject) {
        const data = response[optionObject];
        if(data) {
          const fieldValue = createOptions(data, optionKey, optionValue);
          setOptions(fieldValue);
        }
      } else {
        const data = response;
        if(data) {
          const fieldValue = createOptions(data, optionKey, optionValue);
          setOptions(fieldValue);
        }
      }
     
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={ngModel}>{label}</label>
      <Controller
        name={ngModel}
        control={control}
        render={({ field }) => (
          <div>
            <AsyncTypeahead
              {...field}
              id={ngModel}
              disabled={disabled}
              isLoading={isLoading}
              className={`${errors[ngModel] ? 'is-invalid' : ''}`}
              labelKey="optionValue"
              minLength={minLength}
              onSearch={getOptions}
              options={options}
              defaultSelected={[`${defValue}`]} 
              placeholder={placeholder}
              onChange={(selected) => {
                field.onChange(selected.map((option) => option.optionKey));
              }}
            />
            {/* {console.log('val', options.find((option) => option.optionKey === field.value))} */}
            <ErrorMessage ngModel={ngModel} errors={errors} />
          </div>
          )}
      />
    </div>
  );
};

export default InputTypeheadField;

InputTypeheadField.propTypes = {
  ngModel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  optionKey: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  urlLookup: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  optionObject: PropTypes.string
}