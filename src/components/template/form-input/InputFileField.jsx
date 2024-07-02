import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import WebCamPro from './WebCamPro';

const UploadFile = (props) => {

    const { fileExt, setUploadFile } = props;

    return (
        <label style={{cursor: 'pointer'}} className="bi bi-cloud-arrow-up fs-3 text-secondary">
            <input
            type="file"
            className="d-none"
            accept={fileExt}
            onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    setUploadFile(reader.result);
                };
                reader.readAsDataURL(file);
            }}
            />
        </label>
    )
}

export default function InputFileField(props) {

    const { ngModel, fileType, ext, label } = props;
    const { control, setValue } = useFormContext();
    const [fileExt, setFileExt] = useState('');
    const [uploadFile, setUploadFile] = useState(null)

    useEffect(() => {
        if(fileType === 'image') {
            setFileExt(`image/${ext}`);
        } else if(fileType === 'pdf') {
            setFileExt('.pdf');
        }
    }, [fileType, ext]);

    useEffect(() => {
      if(uploadFile) {
        setValue(ngModel, uploadFile);
      }
    }, [uploadFile, ngModel, setValue]);

  return (
    <div className="mb-3">
        <label htmlFor={ngModel} className="form-label">{label}</label>
        <Controller
            name={ngModel}
            control={control}
            render={({ field }) => (
            <div className="mb-3">
                <div className="card">
                <div className="card-body">
                    {
                    field.value ? 
                    <img className="img-fluid" src={field.value} alt="Captured" /> : 
                    <div className="text-center input-image">
                        <i className="bi bi-person"></i>
                    </div>
                    }
                    <div className="text-center d-flex justify-content-around">
                        <WebCamPro extentions={fileExt} screenShot={setUploadFile} />
                        <UploadFile fileExt={fileExt} setUploadFile={setUploadFile} />
                    </div>
                </div>
                </div>
            </div>
            )}
        />
    </div>
  )
}
