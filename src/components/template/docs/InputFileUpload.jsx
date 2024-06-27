import React, { useState, useEffect, useRef } from "react";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const screenshotsContainerRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [savedScreenshots, setSavedScreenshots] = useState([]);

  useEffect(() => {
    initializeCamera();

    return () => {
      stopVideoStream();
    };
  }, [useFrontCamera]);

  const stopVideoStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const initializeCamera = async () => {
    stopVideoStream();

    const constraints = {
      video: {
        facingMode: useFrontCamera ? "user" : "environment",
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Could not access the camera");
    }
  };

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    // Resize the image to desired dimensions
    const resizedCanvas = resizeImage(canvas, 640, 480); // Example: Resize to 640x480
    const dataUrl = resizedCanvas.toDataURL("image/png");

    // Generate random file name
    const fileName = generateRandomFileName();

    // Save screenshot to localStorage
    localStorage.setItem(fileName, dataUrl);

    // Update savedScreenshots state with new screenshot
    setSavedScreenshots([...savedScreenshots, fileName]);
  };

  const generateRandomFileName = () => {
    return `screenshot_${Math.random().toString(36).substr(2, 9)}.png`;
  };

  const resizeImage = (canvas, targetWidth, targetHeight) => {
    const { width, height } = canvas;

    // Hitung skala untuk menentukan bagian mana yang akan dipangkas
    const scale = Math.min(targetWidth / width, targetHeight / height);

    // Hitung ukuran baru setelah scaling
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    // Buat canvas baru untuk hasil resize dengan ukuran target
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;

    // Lakukan resize ke canvas baru
    resizedCanvas.getContext("2d").drawImage(
      canvas,
      0, 0, width, height, // Bagian yang akan digambar dari gambar asli
      0, 0, targetWidth, targetHeight // Bagian yang akan digambar ulang di canvas baru
    );

    return resizedCanvas;
  };

  const handleLoadScreenshot = (fileName) => {
    const dataUrl = localStorage.getItem(fileName);
    const img = document.createElement("img");
    img.src = dataUrl;
    screenshotsContainerRef.current.innerHTML = "";
    screenshotsContainerRef.current.appendChild(img);
  };

  const handleChangeCamera = () => {
    setUseFrontCamera((prev) => !prev);
    initializeCamera();
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        autoPlay
        muted
      ></video>
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
        <button onClick={handleScreenshot} className="btn btn-light">
          <i className="bi bi-camera-fill"></i>
        </button>
        {savedScreenshots.length > 0 && (
          <button onClick={() => handleLoadScreenshot(savedScreenshots[savedScreenshots.length - 1])} className="btn btn-light">
            <i className="bi bi-cloud-arrow-down-fill"></i>
          </button>
        )}
        <button onClick={handleChangeCamera} className="btn btn-light">
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div ref={screenshotsContainerRef}></div>
    </div>
  );
};

export default CameraApp;
