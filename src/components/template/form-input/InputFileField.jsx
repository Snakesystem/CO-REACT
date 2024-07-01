import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import WebCamPro from './WebCam';

export default function InputFileField(props) {

    const { ngModel, fileType, ext } = props;
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

    console.log('first', uploadFile)

  return (
    <div className="mb-3">
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
                  <label className="bi bi-cloud-arrow-up fs-3 text-secondary">
                    <input
                      type="file"
                      className="d-none"
                      accept={fileExt}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                            setUploadFile(reader.result);
                          setValue(ngModel, reader.result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
