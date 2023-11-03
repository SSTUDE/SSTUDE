import React from "react";
import { styled } from "styled-components";
import ResultsImg from "./ResultsImg";
import ResultsInfo from "./ResultsInfo";
import Palette from "./Palette";

const StyledContainer = styled.div`
  /* overflow: hidden; */
`;

// 페이지 제목
const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  /* font-weight: 600; */
  font-family: "Giants-Bold";
`;

// 사진 + 설명 결과 컨테이너
const StyledResultsContainer = styled.section`
  /* font-family: "MyLotteBold"; */

  display: flex;

  position: relative;
  right: -25%;

  width: 75%;
  /* height: 100vh; */
`;

// 퍼스널 컬러 결과 컨테이너
const StyledPersonalColorResults = styled.section``;

const PersonalColorResults = () => {
  return (
    <StyledContainer>
      <StyledTitle>진단 결과</StyledTitle>
      <StyledResultsContainer>
        <ResultsImg />
        <ResultsInfo />
      </StyledResultsContainer>

      <StyledPersonalColorResults>
        <Palette />
      </StyledPersonalColorResults>
    </StyledContainer>
  );
};

export default PersonalColorResults;
