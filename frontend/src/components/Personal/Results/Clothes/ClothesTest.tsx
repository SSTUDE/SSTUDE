import axios from "axios";
import { styled } from "styled-components";
import DiagnosisLoading from "../DiagnosisLoading";
import React, { useEffect, useState } from "react";
import { images } from "../../../../constants/images";

// 페이지 전체 컨테이너
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

// 진단 정보 컨테이너 ( 이전 점수 + 사진 + 현재 점수 / 사진 두 번 이상 찍은 경우 )
const StlyedInfoContainer2 = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

// 이전 점수 컨테이너
const StyledPrevScoreContainer2 = styled.article`
  display: flex;
  flex-direction: column;

  position: relative;
  top: 40px;
`;
// 이전 점수 제목
const StyledPrevScoreTitle2 = styled.h1`
  font-size: 3rem;
`;
// 이전 점수가 없는 경우
const StyledPrevScore2 = styled.p`
  font-size: 2rem;
`;

// 현재 사진 컨테이너
const StyledCurImgContainer2 = styled.section``;
// 현재 점수 제목
const StyledAfterScoreTitle2 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 0;
`;
// 현재 사진
const StyledCurImg2 = styled.img`
  position: relative;

  border: 1px solid white;

  width: 45vh;
  height: 60vh;
  margin: 0;

  object-fit: cover;
`;
// 현재 점수
const StyledAfterScore2 = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
`;

// 이전 사진 컨테이너
const StyledPrevImgContainer2 = styled.section``;
// 이전 점수 제목
const StyledBeforeScoreTitle2 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 0;
`;
// 이전 사진
const StyledPrevImg2 = styled.img`
  position: relative;

  border: 1px solid white;

  width: 45vh;
  height: 60vh;
  margin: 0;

  object-fit: cover;
`;
// 이전 점수
const StyledBeforeScore2 = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
`;

const ClothesTest = () => {
  return (
    <StyledContainer>
      <>
        <StyledTitle>진단 결과</StyledTitle>
        <StlyedInfoContainer2>
          <StyledPrevScoreContainer2>
            <StyledPrevScoreTitle2>이전 점수</StyledPrevScoreTitle2>
            <StyledPrevScore2>이전 점수가 없습니다.</StyledPrevScore2>
          </StyledPrevScoreContainer2>
          <StyledCurImgContainer2>
            <StyledAfterScoreTitle2>After</StyledAfterScoreTitle2>
            <StyledCurImg2 src={images.personal.dummy1} />
            <StyledAfterScore2>80점</StyledAfterScore2>
          </StyledCurImgContainer2>
          <StyledPrevImgContainer2>
            <StyledBeforeScoreTitle2>Before</StyledBeforeScoreTitle2>
            <StyledPrevImg2 src={images.personal.dummy1} />
            <StyledBeforeScore2>50점</StyledBeforeScore2>
          </StyledPrevImgContainer2>
        </StlyedInfoContainer2>
      </>
    </StyledContainer>
  );
};

export default ClothesTest;
