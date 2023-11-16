import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 스타일드 컴포넌트를 이용한 CSS 적용
const SpinAnimation = keyframes`
  100% { 
    transform: translate(-50%, -50%) rotate(360deg); 
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 32%;
  left: 50%;
  width: 15%;
  transform: translate(-50%, -50%);

  opacity: 0.75;
  overflow: hidden;
  animation: ${SpinAnimation} 3s cubic-bezier(0.4, 0.1, 0.1, 0.8) infinite;
`;

const ErrorCircle = () => {
  useEffect(() => {
    const setBodyHeight = () => {
      document.body.style.height = `${window.innerHeight}px`;
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundImage =
        'url("https://docs.google.com/drawings/d/1D-pEG5cMHwB4sQWC5w8wMVlkGqiBSEIrYnsAELtiHj4/pub?w=1440&amp;h=1080")';
    };

    window.addEventListener("resize", setBodyHeight);
    setBodyHeight();

    return () => {
      window.removeEventListener("resize", setBodyHeight);
    };
  }, []);

  return (
    <StyledImage
      id="hi"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/BYR_color_wheel.svg/2000px-BYR_color_wheel.svg.png"
      alt="Color wheel"
    />
  );
};

export default ErrorCircle;
