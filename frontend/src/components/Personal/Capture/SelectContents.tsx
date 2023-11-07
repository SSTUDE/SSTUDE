// 진단 종류 고르는 Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MainButton from "../Main/MainButton";
import ErrorModal from "./ErrorModal";

// 진단 컨텐츠 고르는 전체 컨테이너
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

// 버튼 컨테이너
const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin-top: 15vw;

  width: 100%;
  /* height: 100vh; */
`;

// 카메라 버튼
const StyledCameraButton = styled.button`
  position: relative;
  /* right: 20%; */
  /* top: 30%; */

  width: 200px;
  height: 200px;

  background-color: transparent;
  border: none;

  cursor: pointer;
`;

// 버튼 내용
const StyledPTag = styled.p`
  font-family: "Giants-Bold";
  color: white;
  font-size: 2rem;
  text-align: center;

  width: 100%;
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

const SelectContents = () => {
  const navigate = useNavigate();
  const [hasDiagnosedPersonalColor, setHasDiagnosedPersonalColor] =
    useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handlePersonalCameraClick = () => {
    navigate("/personalselectpersonal");
  };

  const handleClothesCameraClick = () => {
    if (!hasDiagnosedPersonalColor) {
      setIsErrorModalOpen(true);
    } else {
      navigate("/personalselectclothes");
    }
  };

  const handleCloseModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <StyledContainer>
      <MainButton />
      <StyledTitle>진단 하기</StyledTitle>
      <StyledButtonContainer>
        <StyledCameraButton onClick={handlePersonalCameraClick}>
          <CameraIcon />
          <StyledPTag>퍼스널 컬러</StyledPTag>
          <StyledPTag>진단 하기</StyledPTag>
        </StyledCameraButton>
        <StyledCameraButton onClick={handleClothesCameraClick}>
          <CameraIcon />
          <StyledPTag>의상</StyledPTag>
          <StyledPTag>진단 하기</StyledPTag>
        </StyledCameraButton>
      </StyledButtonContainer>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseModal}
        errorMessage={`퍼스널 컬러 진단 결과가 엄쨔! \n퍼스널 컬러 진단 결과를 토대로 의상 점수를 진단해주꺼야 \n퍼스널 컬러를 먼저 진단하구 와!! 아게찌?`}
      />
    </StyledContainer>
  );
};

export default SelectContents;