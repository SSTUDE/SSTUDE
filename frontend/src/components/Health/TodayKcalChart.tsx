import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// 전체 컨테이너
const StyledContainer = styled.section`
  display: flex;
  justify-content: center;

  margin: 4% 0;
`;

//
const StyledKcalDataContainer = styled.article`
  display: flex;
  justify-content: center;

  width: 40%;
  height: 20vh;
  padding: 1%;

  border: 6px solid white;
  border-radius: 20px;
`;

const CircleChartContainer = styled.section`
  position: relative;
  max-width: 180px;
  width: 100%;
`;

const CircleChart = styled.svg`
  transform: rotate(-90deg);
  overflow: visible;
`;

const CircleConsumedKcalChartPercentage = styled.span`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 1.5rem;
  font-weight: 700;

  position: absolute;
  left: -70%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBruntKcalChartPercentage = styled.span`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 1.5rem;
  font-weight: 700;

  position: absolute;
  right: -70%;
  top: 50%;
  transform: translate(50%, -50%);
`;

// 애니메이션 정의
const fillAnimation = keyframes`
  0% {
    stroke-dasharray: 0 100;
  }
  100% {
    stroke-dasharray: 100 100;
  }
`;

const Circle = styled.circle`
  animation: ${fillAnimation} 1.35s linear;
`;

const TodayKcalChart = () => {
  const [burntKcalPercentage, setBurntKcalPercentage] = useState(0);
  const [consumedKcalPercentage, setConsumedKcalPercentage] = useState(0);

  // 더미 데이터
  const totalKcal = 5000;
  const burntKcal = 2000;
  const consumedKcal = 3000;

  useEffect(() => {
    // 비율 계산
    setBurntKcalPercentage((burntKcal / totalKcal) * 100);
    setConsumedKcalPercentage((consumedKcal / totalKcal) * 100);
  }, []);

  return (
    <StyledContainer>
      <StyledKcalDataContainer>
        <CircleChartContainer>
          <CircleChart viewBox="0 0 36 36">
            <Circle
              stroke="#fa5834"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              cx="18"
              cy="18"
              r="16"
              strokeDasharray={`${burntKcalPercentage} 100`}
            />
            <Circle
              stroke="#35b6e9"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              cx="18"
              cy="18"
              r="16"
              strokeDasharray={`${consumedKcalPercentage} 100`}
              strokeDashoffset={-burntKcalPercentage}
            />
          </CircleChart>
          <CircleConsumedKcalChartPercentage>
            섭취 Kcal: {consumedKcalPercentage.toFixed(1)}%
          </CircleConsumedKcalChartPercentage>
          <CircleBruntKcalChartPercentage>
            소모 Kcal: {burntKcalPercentage.toFixed(1)}%
          </CircleBruntKcalChartPercentage>
        </CircleChartContainer>
      </StyledKcalDataContainer>
    </StyledContainer>
  );
};

export default TodayKcalChart;
