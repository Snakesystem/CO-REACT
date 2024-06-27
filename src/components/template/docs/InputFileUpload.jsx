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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        autoPlay
        muted
      ></video>
      <div>
        <button onClick={handlePlay} disabled={isPlaying}>
          Play
        </button>
        <button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
        <button onClick={handleScreenshot}>
          Screenshot
        </button>
        <button onClick={handleChangeCamera}>
          Change Camera
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div ref={screenshotsContainerRef}></div>
    </div>
  );
};

export default CameraApp;
