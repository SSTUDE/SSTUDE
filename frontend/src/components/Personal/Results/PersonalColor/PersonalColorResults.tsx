import Palette from "./Palette";
import ResultsImg from "./ResultsImg";
import ResultsInfo from "./ResultsInfo";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import MainButton from "../../Main/MainButton";
import DiagnosisLoading from "../DiagnosisLoading";
import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../../store/store";
import { PersonalBeautyResults } from "../../Main/PersonalSlice";

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
  height: 65vh;
`;

// 퍼스널 컬러 결과 컨테이너
const StyledPersonalColorResults = styled.section``;

const PersonalColorResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const data = dispatch(PersonalBeautyResults({ date: "2023-11-14" }));

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

  const goPersonal = () => {
  }

  return (
    <StyledContainer>
      {isLoading ? (
        <DiagnosisLoading />
      ) : (
        <>
          <MainButton onClick={goPersonal} />
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
