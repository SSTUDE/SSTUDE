import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import Carousel from "./Carousel";

const StyledSection = styled.section`
  width: 100%;
  height: 70vh;
`;

const StyledScoreName = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  top: 30px;

  font-size: 1.5rem !important;
`;

const StyledScore = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  top: 10px;

  font-size: 2rem !important;
  font-weight: 600;
`;

const StyledHighestScore = styled.p`
  display: flex;
  justify-content: center;

  position: relative;
  top: 10px;

  font-size: 2rem !important;
  font-weight: 600;
`;

const PreviousClothesResults = () => {
  return (
    <StyledSection>
      <Carousel />
      <StyledScoreName>점수</StyledScoreName>
      <StyledScore>100점</StyledScore>
      <StyledHighestScore>최고 점수</StyledHighestScore>
    </StyledSection>
  );
};
export default PreviousClothesResults;
