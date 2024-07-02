import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage, createOptions, LoadingSkeleton } from '../../../utils/utility';
import { toast } from 'react-toastify';
import { useLoadingApi } from '../../../hooks/useLoadingApi';

export default function SelectDynamic(props) {

    const { ngModel, label, options, optionKey, optionValue, valueKey, disabled } = props;
    const { control, formState } = useFormContext();
    const { errors } = formState;
    const { isLoading } = useLoadingApi()

    const fieldOptions = createOptions(options, optionKey, optionValue);

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

      if(valueKey === undefined) {
        toast.error(` At ${ngModel} valueKey not null`);
      }
    }, [ngModel, optionKey, optionValue, valueKey, options]);

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={ngModel}>{label}</label>
      <Controller
        name={ngModel}
        control={control}
        render={({ field }) => (
          <select className={`form-select ${errors[ngModel] ? 'is-invalid' : ''}`} disabled={disabled} {...field} aria-label="Default select example">
            <option value={typeof valueKey !== 'number' ? 0 : ''}> ---Please choice--- </option>
            {isLoading ? <LoadingSkeleton count={1} /> : fieldOptions ? fieldOptions.map(({ optionKey, optionValue }, index) => (
              <option key={index} value={optionKey}>{optionValue}</option>
            )) : <option>Not Found</option>}
          </select>
        )}
      />
      <ErrorMessage ngModel={ngModel} errors={errors} />
    </div>
  )
}

SelectDynamic.propTypes = {
    ngModel: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    optionKey: PropTypes.string.isRequired,
    optionValue: PropTypes.string.isRequired,
    valueKey: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};
