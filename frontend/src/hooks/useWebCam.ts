import { useRef, useCallback, useEffect } from "react";

const useWebcam = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 웹캠 시작 함수
  const startWebcam = useCallback(async () => {
    try {
      console.log("웹캠 시작 시도 중...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        console.log("웹캠 스트림 설정 완료");
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("웹캠 시작 중 에러 발생:", err);
    }
  }, []);

  // 이미지 캡쳐 함수
  const captureImage = useCallback(
    (callback: (blob: Blob) => void) => {
      const canvas = canvasRef.current;
      const video = webcamRef.current;

      if (canvas && video) {
        console.log("이미지 캡쳐 시도 중...");
        const context = canvas.getContext("2d");

        if (context) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          context.setTransform(1, 0, 0, 1, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              console.log("이미지 캡쳐 완료");
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

  // 웹캠 중지 함수
  const stopWebcam = useCallback(() => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      console.log("웹캠 중지 시도 중...");
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => {
        console.log(`트랙 중지: ${track.label}`);
        track.stop();
      });
      webcamRef.current.srcObject = null;
      console.log("웹캠 중지 완료");
    }
  }, []);

  // 마운트 시 웹캠 시작
  useEffect(() => {
    startWebcam();
    if (webcamRef.current) {
      console.log("웹캠 화면 반전 설정");
      webcamRef.current.style.transform = "scaleX(-1)";
    }
  }, [startWebcam]);

  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;
