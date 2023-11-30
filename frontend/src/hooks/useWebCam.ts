import { useRef, useCallback, useEffect } from "react";

const useWebcam = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("웹캠 시작 중 에러 발생:", err);
    }
  }, []);

  const captureImage = useCallback(
    (callback: (blob: Blob) => void) => {
      const canvas = canvasRef.current;
      const video = webcamRef.current;

      if (canvas && video) {
        const context = canvas.getContext("2d");

        if (context) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          context.setTransform(1, 0, 0, 1, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              callback(blob);
            } else {
              console.error("캡쳐한 이미지가 없음");
            }
          }, "image/png");
        } else {
          console.error("캔버스 컨텍스트를 가져오는 데 실패함");
        }
      } else {
        console.error("캔버스 또는 비디오 요소가 없음");
      }
    },
    [canvasRef, webcamRef]
  );

  const stopWebcam = useCallback(() => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      webcamRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    startWebcam();
    if (webcamRef.current) {
      webcamRef.current.style.transform = "scaleX(-1)";
    }
  }, [startWebcam]);

  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;
