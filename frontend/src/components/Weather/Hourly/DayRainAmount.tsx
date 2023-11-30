import React from 'react';
import { WeatherDataCustom } from '../types';
import styled from 'styled-components';

type DayRainAmountProps = {
  RainAmountDatas: WeatherDataCustom;
  index: number;
};

const DayRainAmount: React.FC<DayRainAmountProps> = ({ RainAmountDatas, index }) => {
  let RainAmount = RainAmountDatas.fcstValue === '강수없음' ? '0' : RainAmountDatas.fcstValue;
    
  return (
    <Wrap $index={index}>
        <span className="time">{RainAmount}</span> 
    </Wrap>
  );
};

const Wrap = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  grid-column-start: ${props => props.$index + 1};
`;

export default DayRainAmount;
