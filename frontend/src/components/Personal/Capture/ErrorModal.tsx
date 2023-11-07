// 퍼스널 컬러 진단 결과 없이 의상 진단 버튼 누른 경우 생기는 Error Modal
import React, { useRef } from "react";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import { useNavigate } from "react-router-dom";
import ErrorCircle from "./ErrorCircle";

// 모달 컨테이너
const StyledModalContainer = styled.div`
  overflow: auto;
  z-index: 1;

  position: fixed;
  left: 0;
  top: 0;

  width: 100%;
  /* height: 100%; */

  background-color: rgba(0, 0, 0, 0.4);
`;

// 모달 컨텐츠 Div
const StyledModalContent = styled.div`
  background-color: #fefefe;

  margin: 20% auto;
  padding: 20px;
  width: 50%;
  height: 35vh;

  border: none;
`;

// 닫기 버튼
const StyledCloseButton = styled.span`
  position: relative;
  top: -30px;
  float: right;

  color: #aaa;
  font-size: 5rem;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

// 에러 메세지
const ErrorMessage = styled.div`
  position: relative;
  top: 110px;

  margin: 4%;

  font-family: "Giants-Bold";
  color: black;
  font-size: 2rem;
  white-space: pre-line; // 줄바꿈 적용
  text-align: center;
`;

const StyledPersonalColorCaptureButton = styled.button`
  position: relative;

  width: 100%;
  margin: 120px 0;

  border: none;
  background-color: transparent;

  font-size: 1.5rem;
  font-family: "Giants-Bold";
`;

type IErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};

const ErrorModal: React.FC<IErrorModalProps> = ({
  isOpen,
  onClose,
  errorMessage,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCloseOnOverlay = (e: React.MouseEvent) => {
    console.log(e);
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
      // contains 메서드는 HTMLElement의 메서드
      // e.target이 실제로 DOM 요소임을 전달
      // as Node를 사용 -> e.target을 명시적으로 Node 타입으로 캐스팅
    ) {
      onClose();
    }
  };

  const handlePersonalColorCapture = () => {};

  if (!isOpen) return null;
  return (
    <StyledModalContainer onClick={handleCloseOnOverlay}>
      <StyledModalContent ref={modalContentRef}>
        <ErrorCircle />
        <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <StyledPersonalColorCaptureButton>
          퍼스널 컬러 진단하러 가기
        </StyledPersonalColorCaptureButton>
      </StyledModalContent>
    </StyledModalContainer>
  );
};

export default ErrorModal;
