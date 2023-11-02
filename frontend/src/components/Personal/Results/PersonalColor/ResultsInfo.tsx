import React, { useState } from "react";
import { styled } from "styled-components";

const StyledContainer = styled.section`
  flex: 1;
`;

// 진단값 영문명
const StyledColorNameEN = styled.p`
  font-size: 4rem;
  font-weight: 700;

  margin: 0;
`;

// 진단값 한글
const StyledColorNameKR = styled.p`
  font-size: 3rem;
  font-weight: 600;

  margin: 0 0 2% 0;
`;

// 진단값 설명
const StyledColorInfo = styled.div`
  font-size: 2rem;
  font-weight: 600;

  margin: 0 0 2% 0;
`;

// 뷰티팁 전체 컨테이너
const StyledMyBeautyTipContainer = styled.div``;

// 뷰티팁 타이틀
const StyledMyBeautyTipTitle = styled.p`
  font-size: 3rem;
  font-weight: 600;

  margin: 2% 0;
`;

// 뷰티팁 컨텐츠
const StyledMyBeautyTipContent = styled.p`
  font-size: 2rem;
  font-weight: 600;

  margin: 0 0 2% 0;
`;

// 뷰티팁 컨텐츠 설명
const StyledMyBeautyTipInfo = styled.p`
  font-size: 1.5rem;
  font-weight: 600;

  margin: 0 0 2% 0;
`;

// 정보 캐러셀 버튼
const StyledCarouselButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const ResultsInfo = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  return (
    <StyledContainer>
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
          <StyledMyBeautyTipTitle>나의 뷰티 Tip</StyledMyBeautyTipTitle>
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
      <StyledCarouselButtonContainer>
        <button onClick={() => setCarouselIndex(0)}>이전</button>
        <button onClick={() => setCarouselIndex(1)}>다음</button>
      </StyledCarouselButtonContainer>
    </StyledContainer>
  );
};

export default ResultsInfo;
