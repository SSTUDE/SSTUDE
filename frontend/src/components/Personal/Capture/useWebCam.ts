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
      console.error("웹캠을 시작하는 데 실패했습니다: ", err);
    }
  }, []);

  const captureImage = useCallback((callback: (blob: Blob) => void) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current;
  
    console.log("캡처 시작");
  
    if (canvas && video) {
      const context = canvas.getContext("2d");
  
      if (context) {
        console.log("비디오 프레임을 캔버스에 그리는 중...");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        console.log("캔버스 내용을 Blob으로 변환 중...");
        canvas.toBlob((blob) => {
          if (blob) {
            console.log("Blob 생성 완료", blob);
            callback(blob);
          } else {
            console.log("Blob 생성 실패");
          }
        }, 'image/png');
      } else {
        console.log("캔버스의 2D 컨텍스트를 가져오는 데 실패함");
      }
    } else {
      console.log("캔버스 또는 비디오 요소가 없음");
    }
  }, [canvasRef, webcamRef]);

  const stopWebcam = useCallback(() => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => track.stop());
      webcamRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;
