// '퍼스널 컬러 진단 하기' 누른 경우 보이는 Page
import { useDispatch } from "react-redux";
import MainButton from "../Main/MainButton";
import { useNavigate } from "react-router-dom";
import useWebcam from "../../../hooks/useWebCam";
import { AppDispatch } from "../../../store/store";
import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { RASPBERRY_URL } from "../../../apis/constants";
import { useCustomAlert } from "../../../hooks/useAlert";
import { personalPictureToServer } from "./CaptureSlice";
// import { useWebSocket } from "../../../hooks/useWebSocket";

// 전체 컨테이너
const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 페이지 제목
const StyledTitle = styled.h1`
  font-family: "Giants-Bold";
  font-size: 4rem;
  margin: 1.5% 0;
`;

// 캡쳐 앵글
const StyledCaptureAngle = styled.div`
  position: relative;
  width: 50vh;
  height: 65vh;
`;

const StyledVideo = styled.video`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; 
`;

// 앵글 모서리
const Corner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;

  &::before {
    content: "";
    position: absolute;
    border: 3px solid skyblue;
    width: 100%;
    height: 100%;
  }
`;

// 왼쪽 상단 모서리
const TopLeft = styled(Corner)`
  top: 0;
  left: 0;

  &::before {
    border-bottom: none;
    border-right: none;
  }
`;

// 오른쪽 상단 모서리
const TopRight = styled(Corner)`
  top: 0;
  right: 0;

  &::before {
    border-bottom: none;
    border-left: none;
  }
`;

// 왼쪽 하단 모서리
const BottomLeft = styled(Corner)`
  bottom: 0;
  left: 0;

  &::before {
    border-top: none;
    border-right: none;
  }
`;

// 오른쪽 하단 모서리
const BottomRight = styled(Corner)`
  bottom: 0;
  right: 0;

  &::before {
    border-top: none;
    border-left: none;
  }
`;

// 안내 정보
const StyledCaptureInfo = styled.p`
  margin-top: 1.5%;
  font-family: "Giants-Bold";
  font-size: 2rem;
  color: salmon;
`;

// 카메라 버튼
const StyledCameraButton = styled.button`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    color="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 019.07 4h5.86a2 2 0 011.664.9l.812 1.22A2 2 0 0019.07 7H20a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const BlinkingCaptureInfo = styled(StyledCaptureInfo)`
  animation: ${blink} 1s linear infinite;
`;

const BlinkingCameraIcon = styled(CameraIcon)`
  animation: ${blink} 1s linear infinite;
`;

const PersonalColorCapture = () => {
  const { canvasRef, webcamRef, captureImage, stopWebcam } = useWebcam();
  // const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const message = { type: "camera", data: "off" };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const showAlert = useCustomAlert();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      stopWebcam();
      // setTimeout(() => {
      //   sendMessage(message)
      // }, 1000);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleCaptureClick = async () => {
    captureImage(async (blob) => {
      if (blob) {
        try {
          const data = await dispatch(personalPictureToServer(blob));
          if (data.meta.requestStatus === "fulfilled") {
            stopWebcam();
            // setTimeout(() => {
            //   sendMessage(message)
            // }, 1000);
            navigate("/personalcolorsresults");

          } else if (data.payload.request.status === 500) {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 3000);

          } else if (data.payload.request.status === 429) {
            showAlert({
              icon: "warning",
              title: "오늘은 더 이상 시도할 수 없습니다",
            });
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 3000);
          }
        } catch (error) {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 3000);
        }
      }
    })
  }

  const closeCamera = () => {
    stopWebcam();
    console.log("카메라 종료");
    // setTimeout(() => {
    //   sendMessage(message)
    // }, 1000);
  }

  return (
    <StyledContainer>
      <MainButton />
      <StyledTitle>퍼스널 컬러 진단</StyledTitle>
      <StyledCaptureAngle>
        <StyledVideo ref={webcamRef} autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
        <TopLeft />
        <TopRight />
        <BottomLeft />
        <BottomRight />
        <StyledCameraButton onClick={handleCaptureClick}>
          {isBlinking ? (
            <BlinkingCameraIcon />
          ) : (
            <CameraIcon />
          )}
        </StyledCameraButton>
      </StyledCaptureAngle>
      {isBlinking ? (
        <>
          <BlinkingCaptureInfo onClick={closeCamera}>앵글 안에 들어와</BlinkingCaptureInfo>
          <BlinkingCaptureInfo onClick={closeCamera}>정면을 바라보세요</BlinkingCaptureInfo>
        </>
      ) : (
        <>
          <StyledCaptureInfo onClick={closeCamera}>앵글 안에 들어와</StyledCaptureInfo>
          <StyledCaptureInfo onClick={closeCamera}>정면을 바라보세요</StyledCaptureInfo>
        </>
      )}
    </StyledContainer>
  );
};

export default PersonalColorCapture;