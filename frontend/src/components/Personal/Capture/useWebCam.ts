import { useRef, useCallback, useEffect } from "react";

const useWebcam = () => {
  // HTMLVideoElement 타입을 명시하여 비디오 요소를 참조하기 위한 ref 생성
  const webcamRef = useRef<HTMLVideoElement>(null);
  // HTMLCanvasElement 타입을 명시하여 캔버스 요소를 참조하기 위한 ref 생성
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 웹캠을 시작하는 함수
  const startWebcam = useCallback(async () => {
    try {
      // 사용자의 미디어 장치(웹캠)에 접근하여 스트림을 가져옴
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // webcamRef가 현재 가리키는 요소가 있으면 그 요소의 srcObject에 스트림을 할당
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      // 웹캠 접근에 실패한 경우 오류 로깅
      console.error("웹캠을 시작하는 데 실패했습니다: ", err);
    }
  }, []);

  // 이미지를 캡처하는 함수
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

  // 웹캠을 정지하는 함수
  const stopWebcam = useCallback(() => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      // webcamRef의 srcObject를 MediaStream으로 타입 단언
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      // 스트림의 모든 트랙을 가져와 정지
      const tracks = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => track.stop());
      webcamRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  // 외부에서 사용할 수 있도록 ref와 함수들을 반환
  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;
