import React from "react";
import TodayHealthCard from "./TodayHealthCard";
import { styled } from "styled-components";
import TodayHealthData from "./TodayKcalChart";

const StyledContainer = styled.section``;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  font-family: "Giants-Bold";
`;

const TodayHealth = () => {
  return (
    <StyledContainer>
      <StyledTitle>오늘의 일일 활동</StyledTitle>
      <TodayHealthData />
      <TodayHealthCard />
    </StyledContainer>
  );
};

export default TodayHealth;
