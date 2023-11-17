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

  const captureImage = useCallback(
    (callback: (blob: Blob) => void) => {
      const canvas = canvasRef.current;
      const video = webcamRef.current;

      console.log("캡처 시작");

      if (canvas && video) {
        const context = canvas.getContext("2d");

        if (context) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);

          console.log("비디오 프레임을 캔버스에 그리는 중...");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          context.setTransform(1, 0, 0, 1, 0, 0);

          console.log("캔버스 내용을 Blob으로 변환 중...");
          canvas.toBlob((blob) => {
            if (blob) {
              console.log("Blob 생성 완료", blob);
              callback(blob);
            } else {
              console.log("Blob 생성 실패");
            }
          }, "image/png");
        } else {
          console.log("캔버스의 2D 컨텍스트를 가져오는 데 실패함");
        }
      } else {
        console.log("캔버스 또는 비디오 요소가 없음");
      }
    },
    [canvasRef, webcamRef]
  );

  const stopWebcam = useCallback(() => {
    console.log("웹캠 종료 시도 중...", webcamRef,);
  
    if (webcamRef.current && webcamRef.current.srcObject) {
      console.log("웹캠 참조 및 srcObject 확인됨");
  
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
  
      console.log(`발견된 트랙 수: ${tracks.length}`);
      tracks.forEach((track, index) => {
        console.log(`트랙 ${index} 종료 시도 중...`);
        track.stop();
        console.log(`트랙 ${index} 종료됨`);
      });
  
      webcamRef.current.srcObject = null;
      console.log("srcObject를 null로 설정함");
    } else {
      console.log("웹캠 참조 또는 srcObject가 없음");
    }
  }, [webcamRef]);
  

  useEffect(() => {
    startWebcam();
    if (webcamRef.current) {
      webcamRef.current.style.transform = "scaleX(-1)";
    }
  }, [startWebcam]);

  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;
