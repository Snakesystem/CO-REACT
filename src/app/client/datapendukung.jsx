import React from 'react'
import { useSchema } from '../../hooks/useSchema';
import InputWebcam from '../../components/template/form-input/InputWebcam'
import InputFileUpload from '../../components/template/form-input/InputFileUpload'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
                <InputWebcam/>
              </div>
              <div className="col-md-4">
                <InputFileUpload/>
              </div>
              <div className="col-md-4">
                <InputFileUpload/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
