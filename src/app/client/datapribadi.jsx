import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import InputTextField from '../../components/template/form-input/InputTextField';
import InputCheckBoxField from '../../components/template/form-input/InputCheckBoxField';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectDynamic from '../../components/template/form-input/SelectDynamic';
import { toast } from 'react-toastify';
import { useSchema } from '../../hooks/useSchema';

export default function DataPribadi() {

  const [t, i18n] = useTranslation('lang');
  const [rdn, setRDN] = useState([]);
  const [fundsource, setFundSource] = useState([]);
  const { getRequest } = useApi();
  const { dataPribadiSchema } = useSchema();

  const formDataPribadi = useForm({
    // please input your default values
    defaultValues: {
      // Email: "", // example Email: "feri.irawansyah@micropiranti.com"
      // Fullname: "",
      // Agree: false,
      fundsource: [],
    },
    resolver: yupResolver(dataPribadiSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  })

  const { handleSubmit, formState  } = formDataPribadi;
  const { errors, isValid } = formState;

  useEffect(() => {
    const getRDN = async () => {
      try {
        const result = await getRequest(`list/nationality`);
        setRDN(result);
      } catch (error) {
        console.error(error);
      }
    };
    getRDN();
  }, []);

  useEffect(() => {
    const getFundSource = async () => {
      try {
        const result = await getRequest(`list/fundsource`);
        setFundSource(result);
      } catch (error) {
        console.error(error);
      }
    };
    getFundSource();
  }, []);

  const submitDataPribadi = (data) => {
    console.log(data)
    if(isValid) {
      // dataBank()
      // navigete('/cif/databank')
      toast.success("Okeh data bener")
    } else {
      toast.error("Ada error")
    }
  }

  console.log(errors)

  return (
    <FormProvider {...formDataPribadi}>
      <form noValidate onSubmit={handleSubmit(submitDataPribadi)} className="form-wizard">
        {/* Form layout start */}
        <fieldset className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-6">
                {/* <InputTextField ngModel="Fullname" label="Full Name" placeholder="Abah Six Pack"/> */}
                <SelectDynamic ngModel="BankCode" label={t("CIF.bankrdn")} options={rdn} optionKey="code" optionValue="nation_name" valueKey="number" />
              </div>
              <div className="col-md-6">
                {/* <InputTextField ngModel="Email" label="Email" placeholder="example@micropiranti.com"/> */}
                <InputCheckBoxField ngModel="fundsource" type="checkbox-list" options={fundsource} optionKey="code" optionValue="description" label={t("CIF.jobfoundsource")} mode="vertical" />
              </div>
            </div>
          </div>
        </fieldset> 
        {/* Form layout end */}
        <div className="d-flex flex-row justify-content-between mt-5">
          <div className="flex-column">
            {/* <button type="button" disabled className="btn btn-secondary">Sebelumnya</button> */}
          </div>
          <div className="flex-column">
            <button type="submit" disabled={!isValid} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form> 
    </FormProvider>
  )
}
