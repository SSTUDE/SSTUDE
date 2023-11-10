// 헬스 메인 페이지
import React, { useCallback } from "react";
import TodayHealthCard from "./TodayHealthData";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { HealthCalender } from "./HealthSlice";

const StyledContainer = styled.section``;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  font-family: "Giants-Bold";
`;

const StyledCalenderButton = styled.button`
  position: absolute;
  right: 8%;
  bottom: 7%;

  width: 150px;
  height: 150px;

  background-color: transparent;
  border: none;

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

const TodayHealth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleCalenderClick = () => {
    handleMonth();
    navigate("/healthcalender");
  };

  const handleMonth = useCallback(async () => {
    const data = {
      year: "2023",
      month: "11",
    };
    const actionResult = await dispatch(HealthCalender(data));
    const res = actionResult.payload;
    if (res) {
      // dispatch(setMemberId(res.memberId));
    }
  }, [dispatch]);

  return (
    <StyledContainer>
      <StyledCalenderButton onClick={handleCalenderClick}>
        <CalenderIcon />
      </StyledCalenderButton>
      <StyledTitle>오늘의 일일 활동</StyledTitle>
      <TodayHealthCard />
    </StyledContainer>
  );
};

export default TodayHealth;
