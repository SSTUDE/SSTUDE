// '퍼스널 컬러 진단 하기' 누른 경우 보이는 Page
import React from "react";
import { styled } from "styled-components";
import MainButton from "../Main/MainButton";
import { useNavigate } from "react-router-dom";
import useWebcam from "./useWebCam";

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
  /* margin-top: 40px; */
  width: 50vh;
  height: 65vh;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; // 비디오를 다른 요소들 뒤에 위치시킴
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
  bottom: 10px;
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

const PersonalColorCapture = () => {
  const { webcamRef, captureImage, stopWebcam } = useWebcam();
  const navigate = useNavigate();

  //NOTE - 카메라 종료시 data:off 로 바꿔서 보내면 됨 - 돌아오는 값은 raspberryPiCameraOff

  const handleCaptureClick = () => {
    const capturedImage = captureImage();
    console.log("사진 찍음", capturedImage)
    stopWebcam()
    console.log("카메라 종료")
    //NOTE - 라즈베리에서 카메라 꺼서 내쪽에서 조작 가능
    // navigate("/personalcolorsresults");
  }

  return (
    <StyledContainer>
      <MainButton />
      <StyledTitle>퍼스널 컬러 진단</StyledTitle>
      <StyledCaptureAngle>
      <StyledVideo ref={webcamRef} autoPlay playsInline />
        <TopLeft />
        <TopRight />
        <BottomLeft />
        <BottomRight />
        <StyledCameraButton onClick={handleCaptureClick}>
          <CameraIcon />
        </StyledCameraButton>
      </StyledCaptureAngle>
      <StyledCaptureInfo>앵글 안에 들어와아앙</StyledCaptureInfo>
      <StyledCaptureInfo>정면을 봐 이자시가</StyledCaptureInfo>
    </StyledContainer>
  );
};

export default PersonalColorCapture;
