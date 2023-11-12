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
  const captureImage = useCallback(() => {
    const canvas = canvasRef.current;
    const video = webcamRef.current;
    console.log(canvas, 11, video)

    // canvas와 video 요소가 모두 존재하는 경우
    if (canvas && video) {

      // canvas의 2D 렌더링 컨텍스트를 가져옴
      const context = canvas.getContext("2d");

      if (context) {

        // 비디오의 현재 프레임을 canvas에 그림
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // canvas의 내용을 이미지로 변환하여 반환

        return canvas.toDataURL("image/png");
      }
    }
  }, []);

  // 웹캠을 정지하는 함수
  const stopWebcam = useCallback(() => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      // webcamRef의 srcObject를 MediaStream으로 타입 단언
      const mediaStream = webcamRef.current.srcObject as MediaStream;
      // 스트림의 모든 트랙을 가져와 정지
      const tracks = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }
  }, []);

  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  // 외부에서 사용할 수 있도록 ref와 함수들을 반환
  return { webcamRef, canvasRef, startWebcam, captureImage, stopWebcam };
};

export default useWebcam;