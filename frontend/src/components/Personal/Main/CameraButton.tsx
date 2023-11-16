// 진단 하러 가기 위한 버튼
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

// 전체 컨테이너
const StyledCameraButtonContainer = styled.div``;

// 카메라 버튼
const StyledCameraButton = styled.button`
  position: absolute;
  right: 10%;
  bottom: 20%;

  width: 150px;
  height: 150px;

  background-color: transparent;
  border: none;

  cursor: pointer;
  p {
    color: white;
    font-size: 2rem;
    font-weight: 600;
    white-space: nowrap;

    position: relative;
    right: 30px;
    top: 10px;
  }
`;

// 카메라 아이콘
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

const CameraButton = () => {
  const navigate = useNavigate();

  const handleCameraClick = () => {
    navigate("/personalselectcontents");
  };
  return (
    <StyledCameraButtonContainer>
      <StyledCameraButton onClick={handleCameraClick}>
        <CameraIcon />
        <p>진단하러 가기</p>
      </StyledCameraButton>
    </StyledCameraButtonContainer>
  );
};

export default CameraButton;
