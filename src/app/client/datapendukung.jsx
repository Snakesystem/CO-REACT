import React from 'react'
import { useSchema } from '../../hooks/useSchema';
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputFileField from '../../components/template/form-input/InputFileField';

export default function DataPendukung() {

  const { dataPendukungSchema } = useSchema();

  const dataPendukung = useForm({
    defaultValues: {
      IDCardFile:"",
      SelfieFile:"",
      SignatureFile:"",
    },
    resolver: yupResolver(dataPendukungSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  })

  const { handleSubmit } = dataPendukung;
  const submitDataPendukung = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...dataPendukung}>
      <form noValidate onSubmit={handleSubmit(submitDataPendukung)}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-4">
                <InputFileField ngModel="webcam" fileType="image" ext="png" label="Webcam" />
                {/* <CobaType name="captureImage"/> */}
              </div>
              <div className="col-md-4">
                <InputFileField ngModel="IDCardFile" fileType="image" ext="png" label="ID Card" />
              </div>
              <div className="col-md-4">
              <InputFileField ngModel="SignatureFile" fileType="image" ext="png" label="Signature" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </FormProvider>
  )
}
