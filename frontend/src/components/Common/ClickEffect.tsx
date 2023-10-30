import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const ClickEffect = () => {
  const [click, setClick] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClick({ x: e.clientX, y: e.clientY, show: true });
      // 함수형 업데이트를 사용하여 'click' 상태를 직접 참조하지 않음
      setTimeout(() => setClick((c) => ({ ...c, show: false })), 500);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []); // 종속성 배열은 비워둠

  return click.show ? <Effect x={click.x} y={click.y} /> : null;
};

const clickEffectAnimation = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
`;

interface EffectProps {
  x: number;
  y: number;
}

const Effect = styled.div<EffectProps>`
  position: fixed; 
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  animation: ${clickEffectAnimation} 1s ease-out;
`;

export default ClickEffect;
