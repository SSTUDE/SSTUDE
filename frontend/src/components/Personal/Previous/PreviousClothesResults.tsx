import React, { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import Carousel from "./Carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const StyledSection = styled.section`
  width: 100%;
  height: 65vh;
  position: relative;
`;

const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: -44px;
  height: calc(65% - 159px);

  background-color: #000000c2;
  color: white;
  /* background-color: black; */
`;

// 점수 글씨
const StyledScoreName = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  margin: 3% 0 0 0;

  font-size: 2rem;
  font-family: "KBO-Dia-Gothic_bold";
  text-shadow: 3px 2px 2px grey;
`;

// 점수
const StyledScore = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  top: 20px;

  font-size: 2rem;
  font-weight: 600;
  font-family: "KBO-Dia-Gothic_bold";
  text-shadow: 3px 2px 2px grey;
`;

// 최고 점수
const StyledHighestScore = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  top: 50px;

  font-size: 3rem;
  font-weight: 600;
  font-family: "LeferiPoint-BlackObliqueA";
  color: #469be1;
  text-shadow: 4px 2px 2px #469be175;
`;

const PreviousClothesResults = () => {
  const { clothes } = useSelector((state: RootState) => state.personal);
  console.log("score?", clothes);

  return (
    <StyledSection>
      <Carousel />
      <InfoArticle>
        <StyledScoreName>점수</StyledScoreName>
        <StyledScore>
          {clothes ? clothes.score : "진단 결과가 없습니다"}
        </StyledScore>
        <StyledHighestScore>High Score</StyledHighestScore>
      </InfoArticle>
    </StyledSection>
  );
};
export default PreviousClothesResults;
