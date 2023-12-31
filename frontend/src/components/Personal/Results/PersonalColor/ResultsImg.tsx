import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
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
  width: auto;
`;

const StyledImg = styled.img`
  margin: 2%;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px;
  animation: ${shadowDropCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  width: 48vh;
  height: 64vh;
  object-fit: cover;
  object-position: top;
`;

const ResultsImg = () => {
  const { beautyResults } = useSelector((state: RootState) => state.personal);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StyledContainer>
      {isLoading && <p>로딩 중...</p>}
      <StyledImg
        src={beautyResults?.user_img || "non-existent-url"}
        alt="사진이 없습니다"
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = images.personal.errorImg;
          setIsLoading(false);
        }}
      />
    </StyledContainer>
  );
};

export default ResultsImg;
