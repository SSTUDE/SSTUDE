import React from "react";
import { images } from "../../../../constants/images";
import { styled } from "styled-components";

const StyledContainer = styled.section`
  display: inline-block;

  display: flex;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 85%;
  margin: 2%;

  border-radius: 20px;
`;

const ResultsImg = () => {
  return (
    <StyledContainer>
      <StyledImg src={images.personal.dummy1} />
    </StyledContainer>
  );
};

export default ResultsImg;
