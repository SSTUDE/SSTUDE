import "./font.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../../store/store";

const getTitleColor = (personalColor?: string) => {
  if (!personalColor) return "#fff";
  if (personalColor.includes("웜")) return "#f0776c";
  if (personalColor.includes("쿨")) return "#469be1";
  return "#fff";
};

const getInfoColor = (personalColor?: string) => {
  if (!personalColor) return "#fff";
  if (personalColor.includes("웜")) return "#f4d1bd";
  if (personalColor.includes("쿨")) return "#9bc2e3";
  return "#fff";
};

const StyledContainer = styled.section`
  flex: 1;
  position: relative;
  right: -40px;
  height: 100%;
`;

const StyledColorNameEN = styled.p<{ color: string }>`
  font-family: "LeferiPoint-BlackObliqueA";
  font-size: 4rem;
  font-weight: 700;
  color: ${(props) => props.color};
  margin: 0;
  padding-top: 1.5%;
`;

const StyledColorNameKR = styled.p<{ color: string }>`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.color};
  margin: 0 0 2% 0;
`;

const StyledColorInfo = styled.div<{ color: string }>`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.color};
  margin: 0 0 2% 0;
  padding: 0 8% 0 0;
  line-height: 180%;
`;

const StyledMyBeautyTipContainer = styled.div``;

const StyledMyBeautyTipTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1.5%;
`;

const StyledMyBeautyTipTitleEN = styled.p<{ color: string }>`
  font-family: "LeferiPoint-BlackObliqueA";
  font-size: 4rem;
  font-weight: 900;
  color: ${(props) => props.color};
`;

const StyledMyBeautyTipTitleKR = styled.p<{ color: string }>`
  font-family: "LeferiPoint-BlackObliqueA";
  font-style: italic;
  font-size: 3rem;
  font-weight: 900;
  color: ${(props) => props.color};
  margin: 2% 0;
  padding: 0 0 1% 2%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledMyBeautyInfoContainer = styled.section`
  position: relative;
  top: -20px;
`;

const StyledMyBeautyTipContent = styled.p<{ color: string }>`
  font-family: "KBO-Dia-Gothic_bold";
  color: ${(props) => props.color};
  font-size: 3rem;
  font-weight: 500;
`;

const StyledMyBeautyTipInfo = styled.p<{ color: string }>`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 2rem;
  font-weight: 300;
  color: ${(props) => props.color};
  margin: 0.5% 0 3.5% 0;
`;

const CarouselPagination = styled.nav`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 22%;
  left: 75%;
`;

const CarouselCircle = styled.div`
  cursor: pointer;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;

  &.active {
    background-color: #aaa;
  }
`;

const ResultsInfo = () => {
  const { beautyResults } = useSelector((state: RootState) => state.personal);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const titleColor = getTitleColor(beautyResults?.personal_color);
  const infoColor = getInfoColor(beautyResults?.personal_color);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchEnd - touchStart > 100 && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    } else if (touchEnd - touchStart < -100 && carouselIndex < 1) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  return (
    <StyledContainer
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {carouselIndex === 0 ? (
        <>
          <StyledColorNameEN color={titleColor}>
            {beautyResults?.eng || "No Results"}
          </StyledColorNameEN>
          <StyledColorNameKR color={titleColor}>
            {beautyResults?.personal_color || "No Results"}
          </StyledColorNameKR>
          <StyledColorInfo color={infoColor}>
            {beautyResults?.expl || "No Results"}
          </StyledColorInfo>
        </>
      ) : (
        <StyledMyBeautyTipContainer>
          <StyledMyBeautyTipTitle>
            <StyledMyBeautyTipTitleEN color={titleColor}>
              My Beauty Tip {""}
            </StyledMyBeautyTipTitleEN>
            <StyledMyBeautyTipTitleKR color={titleColor}>
              나의 뷰티 팁
            </StyledMyBeautyTipTitleKR>
          </StyledMyBeautyTipTitle>

          <StyledMyBeautyInfoContainer>
            <div>
              <StyledMyBeautyTipContent color={titleColor}>
                피부색
              </StyledMyBeautyTipContent>
              <StyledMyBeautyTipInfo color={infoColor}>
                {beautyResults?.skin || "No Results"}
              </StyledMyBeautyTipInfo>
            </div>
            <div>
              <StyledMyBeautyTipContent color={titleColor}>
                머리색
              </StyledMyBeautyTipContent>
              <StyledMyBeautyTipInfo color={infoColor}>
                {beautyResults?.hair || "No Results"}
              </StyledMyBeautyTipInfo>
            </div>
            <div>
              <StyledMyBeautyTipContent color={titleColor}>
                눈동자 테두리 색
              </StyledMyBeautyTipContent>
              <StyledMyBeautyTipInfo color={infoColor}>
                {beautyResults?.eye || "No Results"}
              </StyledMyBeautyTipInfo>
            </div>
            <div>
              <StyledMyBeautyTipContent color={titleColor}>
                액세서리
              </StyledMyBeautyTipContent>
              <StyledMyBeautyTipInfo color={infoColor}>
                {beautyResults?.accessary || "No Results"}
              </StyledMyBeautyTipInfo>
            </div>
          </StyledMyBeautyInfoContainer>
        </StyledMyBeautyTipContainer>
      )}

      <CarouselPagination>
        {[0, 1].map((index) => (
          <CarouselCircle
            key={index}
            className={carouselIndex === index ? "active" : ""}
            onClick={() => setCarouselIndex(index)}
          />
        ))}
      </CarouselPagination>
    </StyledContainer>
  );
};

export default ResultsInfo;
