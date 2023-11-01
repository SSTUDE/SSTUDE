// import { useState } from "react";
// import "./Modal.css";
import { styled } from "styled-components";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

// 모달 뒤 배경
const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  position: relative;
  overflow: auto;

  width: 30%;
  max-height: 95%;
  /* padding: 20px; */

  background-color: white;
  border-radius: 20px;
  background-color: rgba(90, 85, 85);
  color: white;

  p {
    margin: 0;
    text-align: center;
    font-size: 30px;
    padding: 3% 0 0;
  }
`;

// 모달 닫기 버튼
const ModalCloseButton = styled.button`
  position: absolute;
  cursor: pointer;

  right: 20px;
  top: 20px;
  padding: 0;

  border: none;
  background: none;
  font-size: 20px;
  color: white;
`;

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // navigate("/previouspersonalcolor");
    onClose();
  };

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const currentDate = new Date(); // 날짜 받기
  const year = currentDate.getFullYear().toString().slice(2); // 년
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // ex. (월)
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const formattedDate = `${year}.${month}.${day}(${dayOfWeek})`; // 설정된 값

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={stopPropagation}>
        <p>{formattedDate}</p>
        <Layout />
        <ModalCloseButton onClick={handleClose}>닫기</ModalCloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
