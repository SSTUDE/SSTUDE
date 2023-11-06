import React from "react";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

// 퍼스널 컬러 진단 컨테이너
const StyledSection = styled.section`
  width: 100%;
  height: 70vh;
  color: white;
`;

// 이미지 컨테이너
const StyledFigure = styled.figure`
  display: flex;
  justify-content: center;
  height: 70%;
  img {
    /* border-radius: 20px; */
    box-shadow: 0 0 10px 5px black;
  }
`;

// 퍼스널 컬러 정보
const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: -10%;
  height: 26.5vh;

  background-color: #000000c2;
  /* background-color: black; */
`;

// 진단 영문명
const ColorNameEN = styled.div`
  font-family: "LeferiPoint-BlackObliqueA" !important;
  font-size: 4rem !important;
  color: #469be1;

  display: flex;
  align-items: flex-end;

  /* padding: 0 !important; */
  margin: 3% 0 0 0;
`;

// 진단 한글
const ColorNameKR = styled.div`
  font-family: "KBO-Dia-Gothic_bold" !important;
  font-size: 3rem;
  color: #469be1;

  padding: 0 !important;
`;

// 상세보기 버튼
const DetailButton = styled.button`
  /* margin-top: 5%; */
  margin: 7% 0;

  background-color: transparent;
  border: none;

  cursor: pointer;
  font-size: 2rem;
  color: white;
  font-family: "KBO-Dia-Gothic_bold" !important;
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
