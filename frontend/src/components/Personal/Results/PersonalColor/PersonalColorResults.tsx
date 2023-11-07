import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ResultsImg from "./ResultsImg";
import ResultsInfo from "./ResultsInfo";
import Palette from "./Palette";
import DiagnosisLoading from "./DiagnosisLoading";

const StyledContainer = styled.div`
  /* overflow: hidden; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

// 페이지 제목
const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  font-family: "Giants-Bold";
`;

// 사진 + 설명 결과 컨테이너
const StyledResultsContainer = styled.section`
  display: flex;

  position: relative;
  right: -25%;

  width: 75%;
  /* height: 100vh; */
`;

// 퍼스널 컬러 결과 컨테이너
const StyledPersonalColorResults = styled.section``;

const PersonalColorResults = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 unmount시 타이머 해제
  }, []);

  // useEffect(() => {
  //   const image = new Image();
  //   image.src = "이미지 URL";
  //   image.onload = () => {
  //     setIsLoading(false);
  //   };
  // }, []);

  return (
    <StyledContainer>
      {isLoading ? (
        <DiagnosisLoading />
      ) : (
        <>
          <StyledTitle>진단 결과</StyledTitle>
          <StyledResultsContainer>
            <ResultsImg />
            <ResultsInfo />
          </StyledResultsContainer>

          <StyledPersonalColorResults>
            <Palette />
          </StyledPersonalColorResults>
        </>
      )}
    </StyledContainer>
  );
};

export default PersonalColorResults;
