// 헬스 메인 페이지
import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import PrevHealthData from "./PrevHealthData";
import MainButton from "../Personal/Main/MainButton";

const StyledContainer = styled.section``;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  font-family: "Giants-Bold";
`;

// 캘린더로 이동하기 위한 아이콘
const StyledCalenderButton = styled.button`
  position: absolute;
  left: 12.3%;
  top: 5.9%;

  width: 104px;
  height: 104px;

  background-color: #4f4f4f;
  border: 2px solid white;
  border-radius: 15%;

  cursor: pointer;
`;

const CalenderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="white"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

type PrevHealthProps = {
  setCurrentComponent: (component: string) => void;
  healthData: {
    steps: number | null;
    burntKcal: number | null;
    consumedKcal: number | null;
    sleepTime: number | null;
  };
};
const PrevHealth: React.FC<PrevHealthProps> = ({
  setCurrentComponent,
  healthData,
}) => {
  const navigate = useNavigate();

  const handleCalenderClick = () => {
    setCurrentComponent("HealthCalendar"); // Set currentComponent to 'HealthCalendar'
  };

  return (
    <StyledContainer>
      <MainButton />
      <StyledCalenderButton onClick={handleCalenderClick}>
        <CalenderIcon />
      </StyledCalenderButton>
      <StyledTitle>이전 일일 활동</StyledTitle>
      <PrevHealthData />
    </StyledContainer>
  );
};

export default PrevHealth;
