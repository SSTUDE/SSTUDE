import React from 'react';
import { WeatherDataCustom } from '../types';
import styled from 'styled-components';

type DayHumidityProps = {
  HumidityDatas: WeatherDataCustom;
  index: number;
};

const DayHumidity: React.FC<DayHumidityProps> = ({ HumidityDatas, index }) => {

  // 강수 없음이면 0을 나타냄
  let Humidity = HumidityDatas.fcstValue;
    
  return (
    <Wrap $index={index}>
        <span className="time">{Humidity}</span> 
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


export default DayHumidity;
