/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { useApi } from '../../../hooks/useApi'
import SelectDynamic from '../../template/form-input/SelectDynamic';
import useHighRisk from '../../../hooks/useHighRisk'
import { useSchema } from '../../../hooks/useSchema';

export default function Permata() {

  const [occ, setOcc] = useState([]);
  const [poss, setPoss] = useState([]);
  const [nature, setNature] = useState([]);
  const { getRequest } = useApi()
  const { permataSchema } = useSchema();

  const permataForm = useForm({
    defaultValues: {
      Occupation: "",
      Position: "",
      NatureOfBusiness: "",
    },
    resolver: yupResolver(permataSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  });

  const { handleSubmit, formState, watch } = permataForm;
  const { isValid, errors } = formState;
  const [occupation, position, naturebusiness] = watch(['Occupation', 'Position', 'NatureOfBusiness']);
  useHighRisk(occupation, position, naturebusiness)

  const submitDataBRI = (data) => {
    console.log(data)
  }

  const getOccupation = async () => {
    try {
      const result = await getRequest(`list/occupation`);
      setOcc(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    try {
      const result = await getRequest(`list/position`);
      setPoss(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getNatureBusiness = async () => {
    try {
      const result = await getRequest(`list/naturebusiness`);
      setNature(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    getOccupation();
    getPosition();
    getNatureBusiness();

  }, []);
  
  return (
    <FormProvider {...permataForm}>
      <form noValidate onSubmit={handleSubmit(submitDataBRI)}>
          <div className="row">
            <div className="col-md-4">
              <SelectDynamic ngModel="Occupation" label="Occupation" options={occ} optionKey="code" optionValue="description" valueKey="number" />
            </div>
            <div className="col-md-4">
              <SelectDynamic ngModel="Position" label="Position" options={poss} optionKey="code" optionValue="description" valueKey="number" />
            </div>
            <div className="col-md-4">
              <SelectDynamic ngModel="NatureOfBusiness" label="NatureOfBusiness" options={nature} optionKey="code" optionValue="description" valueKey="number" />
            </div>
          </div>
      </form>
    </FormProvider>
  )
}
