import React, { useState } from "react";
import { styled } from "styled-components";
import "./font.css";

const StyledContainer = styled.section`
  flex: 1;
`;

// 진단값 영문명
const StyledColorNameEN = styled.p`
  font-family: "LeferiPoint-BlackObliqueA";
  font-size: 4rem;
  font-weight: 700;
  color: #469be1;

  margin: 0;
  padding-top: 1.5%;
`;

// 진단값 한글
const StyledColorNameKR = styled.p`
  font-family: "KBO-Dia-Gothic_bold";

  font-size: 3rem;
  font-weight: 700;
  /* font-style: italic; */
  color: #469be1;

  margin: 0 0 2% 0;
`;

// 진단값 설명
const StyledColorInfo = styled.div`
  font-family: "KBO-Dia-Gothic_bold";

  font-size: 2rem;
  font-weight: 600;
  color: #9bc2e3;

  margin: 0 0 2% 0;
  padding: 0 4% 0 0;

  line-height: 180%;
`;

// 뷰티팁 전체 컨테이너
const StyledMyBeautyTipContainer = styled.div``;

const StyledMyBeautyTipTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

// 뷰티팁 타이틀 영문명
const StyledMyBeautyTipTitleEN = styled.p`
  font-family: "LeferiPoint-BlackObliqueA";
  /* font-style: italic; */

  /* font-family: "KBO-Dia-Gothic_bold"; */

  font-size: 3rem;
  font-weight: 900;
  color: #469be1;

  margin: 2% 0;
`;

// 뷰티팁 타이틀 한글
const StyledMyBeautyTipTitleKR = styled.p`
  font-family: "LeferiPoint-BlackObliqueA";
  font-style: italic;
  font-size: 2rem;
  font-weight: 900;
  color: #469be1;

  margin: 2% 0;
  padding: 0 0 1% 2%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

// 뷰티팁 컨텐츠
const StyledMyBeautyTipContent = styled.p`
  font-family: "KBO-Dia-Gothic_bold";
  color: #469be1;

  font-size: 2rem;
  font-weight: 500;

  margin: 0 0 2% 0;
`;

// 뷰티팁 컨텐츠 설명
const StyledMyBeautyTipInfo = styled.p`
  font-family: "KBO-Dia-Gothic_bold";

  font-size: 1.5rem;
  font-weight: 300;
  color: #9bc2e3;

  margin: 0 0 3.5% 0;
`;

// 정보 캐러셀 버튼
const StyledCarouselButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 70%;
  transform: translateX(-50%);

  button {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

// 현재 슬라이드 위치
const CarouselPagination = styled.nav`
  display: flex;
  justify-content: center;

  position: absolute;
  bottom: 0;
  left: 70%;
  transform: translateX(-50%);
`;

// 슬라이드 위치 요소
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
  const [carouselIndex, setCarouselIndex] = useState(0); // 캐러셀
  const [touchStart, setTouchStart] = useState(0); // 터치 이벤트

  // 터치 시작 이벤트 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  // 터치 종료 이벤트 처리
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchEnd - touchStart > 100 && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1); // 오른쪽으로 스와이프
    } else if (touchEnd - touchStart < -100 && carouselIndex < 1) {
      setCarouselIndex(carouselIndex + 1); // 왼쪽으로 스와이프
    }
  };

  return (
    <StyledContainer
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {carouselIndex === 0 ? (
        <>
          <StyledColorNameEN>Summer Mute</StyledColorNameEN>
          <StyledColorNameKR>여름 뮤트</StyledColorNameKR>
          <StyledColorInfo>
            <div>장밋빛의 잿빛 피부를 가지고 있는 뮤트톤!</div>
            <div>
              밝은 쿨톤의 색을 사용하고 과감한 포인트 배색으로 리듬감 있는
              스타일링을 해주세요.
            </div>
            <div>
              섀도우는 밝은 애쉬그레이나 로즈빛으로 가볍게, 립은 핫핑크나
              체리레드로 대비를 주어 생동감 있게 메이크업 해주세요!
            </div>
          </StyledColorInfo>
        </>
      ) : (
        <StyledMyBeautyTipContainer>
          <StyledMyBeautyTipTitle>
            <StyledMyBeautyTipTitleEN>
              My Beauty Tip {""}
            </StyledMyBeautyTipTitleEN>
            <StyledMyBeautyTipTitleKR>나의 뷰티 팁</StyledMyBeautyTipTitleKR>
          </StyledMyBeautyTipTitle>

          <div>
            <StyledMyBeautyTipContent>피부색</StyledMyBeautyTipContent>
            <StyledMyBeautyTipInfo>
              노란 빛이 도는 밝은 색
            </StyledMyBeautyTipInfo>
          </div>
          <div>
            <StyledMyBeautyTipContent>머리색</StyledMyBeautyTipContent>
            <StyledMyBeautyTipInfo>밝은 갈색, 짙은 갈색</StyledMyBeautyTipInfo>
          </div>
          <div>
            <StyledMyBeautyTipContent>
              눈동자 테두리 색
            </StyledMyBeautyTipContent>
            <StyledMyBeautyTipInfo>갈색, 황갈색</StyledMyBeautyTipInfo>
          </div>
          <div>
            <StyledMyBeautyTipContent>액세서리</StyledMyBeautyTipContent>
            <StyledMyBeautyTipInfo>로즈골드, 도트, 리본</StyledMyBeautyTipInfo>
          </div>
          <div>
            <StyledMyBeautyTipContent>어울리는 색</StyledMyBeautyTipContent>
            <StyledMyBeautyTipInfo>
              노랑이 섞인 선명하고 부드러운 색
            </StyledMyBeautyTipInfo>
          </div>
        </StyledMyBeautyTipContainer>
      )}
      {/* <StyledCarouselButtonContainer>
        <button onClick={() => setCarouselIndex(0)}>이전</button>
        <button onClick={() => setCarouselIndex(1)}>다음</button>
      </StyledCarouselButtonContainer> */}

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
