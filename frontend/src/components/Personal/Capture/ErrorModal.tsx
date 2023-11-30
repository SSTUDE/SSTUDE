import React, { useRef } from "react";
import ErrorCircle from "./ErrorCircle";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledModalContainer = styled.div`
  overflow: auto;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledModalContent = styled.div`
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  width: 55%;
  height: 40vh;
  border: none;
`;

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

const ErrorMessage = styled.div`
  position: relative;
  top: 110px;
  margin: 4%;
  font-family: "Giants-Bold";
  color: black;
  font-size: 2rem;
  white-space: pre-line; 
  text-align: center;
`;

const StyledPersonalColorCaptureButton = styled.button`
  position: relative;
  top: 100px;
  width: 100%;
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
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)

    ) {
      onClose();
    }
  };

  const handlePersonalColorCapture = () => {
    navigate("/personalselectpersonal");
  };

  if (!isOpen) return null;
  return (
    <StyledModalContainer onClick={handleCloseOnOverlay}>
      <StyledModalContent ref={modalContentRef}>
        <ErrorCircle />
        <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <StyledPersonalColorCaptureButton onClick={handlePersonalColorCapture}>
          퍼스널 컬러 진단하러 가기
        </StyledPersonalColorCaptureButton>
      </StyledModalContent>
    </StyledModalContainer>
  );
};

export default ErrorModal;
