import React from 'react'
import { useSchema } from '../../hooks/useSchema';
import InputFileUpload from '../../components/template/form-input/InputFileUpload'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CameraComponent from '../../components/template/docs/InputFileUpload';
import CameraApp from '../../components/template/docs/InputFileUpload';
import CobaType, { ComponentWeb } from '../../components/template/docs/CobaType';
import WebCamInput from '../../components/template/docs/WebcamInput';
import WebCam from '../../components/template/form-input/WebCam';
import InputFileField from '../../components/template/form-input/InputFileField';

export default function DataPendukung() {

  const { dataPendukungSchema } = useSchema();

  const dataPendukung = useForm({
    defaultValues: {
      IDCardFile:"",
      webcam:"",
      SignatureFile:"",
    },
    resolver: yupResolver(dataPendukungSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  })

  const { handleSubmit } = dataPendukung;
  const submitDataPendukung = (data) => {
    console.log(data)
  }

  const gmbar = localStorage.getItem('gambar');
  const deleteGambar = () => {
    localStorage.removeItem('gambar')
  }

  return (
    <FormProvider {...dataPendukung}>
      <form noValidate onSubmit={handleSubmit(submitDataPendukung)}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-4">
                <InputFileField ngModel="webcam" fileType="image" ext="png" />
                {/* <CobaType name="captureImage"/> */}
              </div>
              <div className="col-md-4">
                <img src={gmbar} alt="" />
                {/* <InputFileUpload/> */}
              </div>
              <div className="col-md-4">
                {/* <InputFileUpload/> */}
              </div>
            </div>
          </div>
        </div>

        {/* <button type="btton" onClick={deleteGambar} className="btn btn-primary">Hapus</button> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </FormProvider>
  )
}
