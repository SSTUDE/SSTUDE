import React from 'react';
import { WeatherDataCustom } from '../types';
import styled from 'styled-components';

type DayRatinRateProps = {
  RainRateDatas: WeatherDataCustom;
  index: number;
};

const DayRatinRate: React.FC<DayRatinRateProps> = ({ RainRateDatas, index }) => {


  const RainRate = RainRateDatas.fcstValue

  return (
    <Wrap $index={index}>
        <span className="time">{RainRate}%</span> 
    </Wrap>
  );
};

// 그리드 컨테이너에 맞게 스타일링된 컴포넌트
const Wrap = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  grid-column-start: ${props => props.$index + 1}; // index 값을 기반으로 열 시작 위치를 지정합니다.
`;

const Label = styled.div`
  position: relative; 
  top: 0%; 
  text-align: center;
  /* left: 50%; */
`

export default DayRatinRate;
