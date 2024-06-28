// Import library yang dibutuhkan
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Webcam from 'react-webcam';

// Inisialisasi SweetAlert dengan SweetAlert2ReactContent
const MySwal = withReactContent(Swal);

// Komponen InputCaptureImage untuk menangkap gambar
const InputCaptureImage = () => {
  const { control, setValue } = useFormContext(); // Menggunakan useFormContext untuk mengakses kontrol formulir

  // Menggunakan ref untuk mengakses objek Webcam
  const webcamRef = React.useRef(null);

  // Fungsi untuk menampilkan SweetAlert dengan video dari webcam
  const openCamera = async () => {
    await MySwal.fire({
      title: 'Capture Image',
      html: (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="auto"
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: 'Capture',
      cancelButtonText: 'Close',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // Masukkan nilai hasil capture ke dalam kontrol react-hook-form
        setValue('captureImage', imageSrc); // 'captureImage' adalah nama dari field dalam formulir
        console.log('Captured image:', imageSrc);
      }
    });
  };

  return (
    <div>
      {/* Tombol untuk menampilkan SweetAlert dengan video webcam */}
      <button onClick={openCamera}>Open Camera</button>

      {/* Komponen Webcam (tersembunyi) untuk digunakan oleh SweetAlert */}
      <Controller
        name="captureImage"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input type="hidden" {...field} />
        )}
      />
    </div>
  );
};

export default InputCaptureImage;
