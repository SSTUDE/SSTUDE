import React from "react";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

const StyledSection = styled.section`
  width: 100%;
  height: 70vh;
`;

const StyledFigure = styled.figure`
  display: flex;
  justify-content: center;
  height: 70%;
  img {
    border-radius: 20px;
  }
`;

const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorNameEN = styled.p`
  font-size: 3rem !important;
  font-weight: 700;
  padding: 0 !important;
  margin: 1%;
`;

const ColorNameKR = styled.p`
  font-size: 2rem !important;
  font-weight: 600;
  padding: 0 !important;
`;

const DetailButton = styled.button`
  /* margin-top: 5%; */
  margin: 3% 0;
  height: 3%;

  background-color: transparent;
  border: none;

  cursor: pointer;

  color: white;

  font-size: 1.5rem;
`;

const PreviousPersonalColorResults = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/personalcolor");
  };

  return (
    <StyledSection>
      <StyledFigure>
        <img src={images.personal.dummy1} />
      </StyledFigure>
      <InfoArticle>
        <ColorNameEN>Summer Mute</ColorNameEN>
        <ColorNameKR>여름 뮤트</ColorNameKR>
        <DetailButton onClick={handleButtonClick}>상세 보기</DetailButton>
      </InfoArticle>
    </StyledSection>
  );
};
export default PreviousPersonalColorResults;
