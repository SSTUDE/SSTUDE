// 홈 및 뒤로가기 버튼
import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useWebcam from "../../../hooks/useWebCam";
import { RASPBERRY_URL } from "../../../apis/constants";
import { useWebSocket } from "../../../hooks/useWebSocket";

// 전체 컨테이너
const StyledContainer = styled.div``;

// 홈 버튼
const StyledHomeButton = styled.button`
  position: absolute;
  left: 5.35%;
  top: 5.9%;
  width: 104px;
  height: 104px;
  background-color: #4f4f4f;
  border: 2px solid white;
  border-radius: 15%;
  cursor: pointer;
`;

// 홈 아이콘
const HomeIcon = () => (
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
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const MainButton = () => {
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const message = { type: "camera", data: "off" };
  const { stopWebcam } = useWebcam();

  const handleHomeClick = () => {
    stopWebcam();
    setTimeout(() => {
      sendMessage(message)
    }, 1000);

    navigate('/mirror')
  };

  return (
    <StyledContainer onClick={handleHomeClick}>
      <StyledHomeButton>
        <HomeIcon />
      </StyledHomeButton>
    </StyledContainer>
  );
};

export default MainButton;
