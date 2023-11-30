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

const Wrap = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  grid-column-start: ${props => props.$index + 1}; 
`;

export default DayRatinRate;
