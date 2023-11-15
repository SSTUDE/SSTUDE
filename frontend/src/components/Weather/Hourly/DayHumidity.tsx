import React from 'react';
import styled from 'styled-components';
import { WeatherDataCustom } from '../types';

type DayHumidityProps = {
  HumidityDatas: WeatherDataCustom;
  index: number;
};

const DayHumidity: React.FC<DayHumidityProps> = ({ HumidityDatas, index }) => {
  // 첫 번째 요소인 경우 "오늘"을 표시
  if (index === 0) {
    return (
      <Label>
        <span className="label">습도
          (%)</span>
      </Label>
    );
  }

  // 습도 없음이면 0을 나타냄
  let Humidity = HumidityDatas.fcstValue;

  return (
    <Wrap $index={index}>
      <span className="time">{Humidity}</span>
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

const Label = styled.div`
  position: relative; 
  top: 0%; 
  text-align: center;
`

export default DayHumidity;
