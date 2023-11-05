import React from "react";
import { images } from "../../../../constants/images";
import { styled, keyframes } from "styled-components";

const shadowDropCenter = keyframes`
  0% {
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgb(50, 195, 243);
  }
  100% {
    transform: translateZ(50px);
  box-shadow: 0 0 10px 5px;
  }
`;

const StyledContainer = styled.section`
  display: inline-block;

  display: flex;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 85%;
  margin: 2%;

  border-radius: 20px;
  box-shadow: 0 0 10px 5px;

  animation: ${shadowDropCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const ResultsImg = () => {
  return (
    <StyledContainer>
      <StyledImg src={images.personal.dummy1} />
    </StyledContainer>
  );
};

export default ResultsImg;
