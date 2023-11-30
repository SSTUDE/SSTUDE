import React from 'react';
import { WeatherDataCustom } from '../types';
import styled from 'styled-components';

type DayHumidityProps = {
  HumidityDatas: WeatherDataCustom;
  index: number;
};

const DayHumidity: React.FC<DayHumidityProps> = ({ HumidityDatas, index }) => {

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


export default DayHumidity;
