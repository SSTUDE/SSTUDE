import React from "react";
import { styled } from "styled-components";
import ResultsImg from "./ResultsImg";
import ResultsInfo from "./ResultsInfo";

// 페이지 제목
const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 2% 0;

  font-size: 4rem;
  font-weight: 600;
`;

// 사진 + 설명 결과 컨테이너
const StyledResultsContainer = styled.section`
  display: flex;

  position: absolute;
  right: 0;

  width: 75%;
  /* height: 100vh; */
`;

// 퍼스널 컬러 결과 컨테이너

const PersonalColorResults = () => {
  return (
    <>
      <StyledTitle>진단 결과</StyledTitle>
      <StyledResultsContainer>
        <ResultsImg />
        <ResultsInfo />
      </StyledResultsContainer>
    </>
  );
};

export default PersonalColorResults;
