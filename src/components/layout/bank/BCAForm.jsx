import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputTypeheadField from '../../template/form-input/InputTypeheadField';
import { useSchema } from '../../../hooks/useSchema';

export default function BCAForm() {

  const { bcaSchema } = useSchema();

  const bcaForm = useForm({
    defaultValues: {
      District: 339,
    },
    resolver: yupResolver(bcaSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  });

  const { handleSubmit, formState } = bcaForm;
  const { errors } = formState;

  const submitDataBCA = (data) => {
    console.log(data)
  }

  console.log('errors', errors)

  return (
    <FormProvider {...bcaForm}>
      <form noValidate onSubmit={handleSubmit(submitDataBCA)}>
          <div className="row">
            <div className="col-md-12">
              <InputTypeheadField 
                ngModel="District" 
                label="District" 
                optionKey="id"
                optionValue="login"
                optionObject="items"
                minLength={2}
                urlLookup="https://api.github.com/search/users"
                placeholder="Type at least 2 characters..."/>
            </div>
          </div>

          <button type="submit" className="btn">Submit</button>
      </form>
    </FormProvider>
  )
}
