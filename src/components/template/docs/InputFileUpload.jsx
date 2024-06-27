import React, { useState, useEffect, useRef } from "react";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const screenshotsContainerRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

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
        width: { min: 1280, ideal: 1920, max: 2560 },
        height: { min: 720, ideal: 1080, max: 1440 },
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

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const img = document.createElement("img");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");

    screenshotsContainerRef.current.prepend(img);
  };

  const handleChangeCamera = () => {
    setUseFrontCamera((prev) => !prev);
  };

  return (
    <div>
      <video ref={videoRef} width="600" autoPlay muted></video>
      <div>
        <button id="btnPlay" onClick={handlePlay} disabled={isPlaying}>
          Play
        </button>
        <button id="btnPause" onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
        <button id="btnScreenshot" onClick={handleScreenshot}>
          Screenshot
        </button>
        <button id="btnChangeCamera" onClick={handleChangeCamera}>
          Change Camera
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div id="screenshots" ref={screenshotsContainerRef}></div>
    </div>
  );
};

export default CameraApp;
