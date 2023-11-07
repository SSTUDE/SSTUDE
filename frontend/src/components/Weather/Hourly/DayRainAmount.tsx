import React from 'react';
import { WeatherDataCustom } from '../types';
import styled from 'styled-components';

type DayRainAmountProps = {
  RainAmountDatas: WeatherDataCustom;
  index: number;
};

const DayRainAmount: React.FC<DayRainAmountProps> = ({ RainAmountDatas, index }) => {
  // 첫 번째 요소인 경우 "오늘"을 표시
  if (index === 0) {
    return (
      <Label>
        <span className="label">강수량
        (mm)</span>
      </Label>
    );
  }

  // 강수 없음이면 0을 나타냄
  let RainAmount = RainAmountDatas.fcstValue === '강수없음' ? '0' : RainAmountDatas.fcstValue;
    
  return (
    <Wrap index={index}>
        <span className="time">{RainAmount}</span> 
    </Wrap>
  );
};

// 그리드 컨테이너에 맞게 스타일링된 컴포넌트
const Wrap = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  grid-column-start: ${props => props.index + 1}; // index 값을 기반으로 열 시작 위치를 지정합니다.
`;

const Label = styled.div`
  position: relative; 
  top: 0%; 
  text-align: center;
  /* left: 50%; */
`

export default DayRainAmount;
