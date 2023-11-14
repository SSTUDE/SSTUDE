import React from "react";
import { styled } from "styled-components";
import Carousel from "./Carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column-reverse; // 열 방향을 반대로 설정
  /* justify-content: flex-end; // 컨텐츠를 컨테이너의 아래쪽으로 정렬
  align-items: center; // 가로축 중앙 정렬 (필요에 따라 조정) */
  width: 100%;
  height: 65vh;
  color: white;
  gap: 10px;
`;

const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 55%;

  gap: 24px;
  z-index: 1;

  background-color: #000000c2;
  color: white;
`;

// 점수 글씨
const StyledScoreName = styled.p`
  margin: 3% 0 0 0;

  font-size: 2rem;
  font-family: "KBO-Dia-Gothic_bold";
  text-shadow: 3px 2px 2px grey;
`;

// 점수
const StyledScore = styled.p`
  top: 20px;

  font-size: 2rem;
  font-weight: 600;
  font-family: "KBO-Dia-Gothic_bold";
  text-shadow: 3px 2px 2px grey;
`;

// 최고 점수
const StyledHighestScore = styled.p`
  top: 50px;

  font-size: 3rem;
  font-weight: 600;
  font-family: "LeferiPoint-BlackObliqueA";
  color: #ffbf00;
  text-shadow: 4px 2px 2px #bf9b30;
`;

const PreviousClothesResults = () => {
  const { clothesData, CarouselIndex } = useSelector(
    (state: RootState) => state.previous
  );

  // 진단 값 중 가장 높은 값
  const highestScore =
    clothesData && clothesData.length > 0
      ? Math.max(...clothesData.map((data) => data.score))
      : 0;

  // 현재 슬라이드의 점수
  const currentScore = clothesData?.[CarouselIndex]?.score || 0;

  return (
    <StyledSection>
      <InfoArticle>
        <StyledScoreName>점수</StyledScoreName>
        <StyledScore>
          {clothesData?.[CarouselIndex]?.score || "진단 결과가 없습니다"}
        </StyledScore>
        <StyledHighestScore
          style={{
            visibility:
              highestScore > 0 && currentScore === highestScore
                ? "visible"
                : "hidden",
          }}
        >
          High Score
        </StyledHighestScore>
      </InfoArticle>
      <Carousel />
    </StyledSection>
  );
};

export default PreviousClothesResults;
