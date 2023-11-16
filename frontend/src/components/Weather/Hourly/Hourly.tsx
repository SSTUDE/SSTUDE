import React from 'react';
import DayCloud from './DayCloud';
import TempChart from './TempChart';
import styled from 'styled-components';
import DayHumidity from './DayHumidity';
import DayRatinRate from './DayRatinRate';
import DayRainAmount from './DayRainAmount';
import { WeatherDataCustom } from '../types';

type HourlyProps = {
  dailySky: WeatherDataCustom[];
  TempDatas: WeatherDataCustom[];
  RainRateDatas: WeatherDataCustom[];
  RainAmountDatas: WeatherDataCustom[];
  HumidityDatas: WeatherDataCustom[];
  RainTypeDatas: WeatherDataCustom[];
};

const Hourly: React.FC<HourlyProps> = ({ dailySky, TempDatas, RainRateDatas, RainAmountDatas, HumidityDatas, RainTypeDatas }) => {
  const dailySkyWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...dailySky];
  const RainRateWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...RainRateDatas];
  const RainAmountWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...RainAmountDatas];
  const HumidityWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...HumidityDatas];

  return (
    <GridContainer $columns={dailySkyWithToday.length}>
      {dailySkyWithToday.map((item, index) => (
        <DayCloud
          key={index}
          dailySky={item}
          RainTypeDatas={RainTypeDatas}
          index={index} />
      ))}
      <TemperatureLabel>기온(°C)</TemperatureLabel>
      {TempDatas.map((item, index) => (
        <TempLabel
          key={index}
          $columns={dailySkyWithToday.length + 1}
          $index={index + 2}
        >
          {item.fcstValue}°
        </TempLabel>
      ))}
      <TempChartWrapper $columns={dailySkyWithToday.length + 1}>
        <TempChart TempDatas={TempDatas} />
      </TempChartWrapper>
      {RainRateWithToday.map((item, index) => (
        <DayRatinRate
          key={index}
          RainRateDatas={item}
          index={index}
        />
      ))}
      {RainAmountWithToday.map((item, index) => (
        <DayRainAmount
          key={index}
          RainAmountDatas={item}
          index={index}
        />
      ))}
      {HumidityWithToday.map((item, index) => (
        <DayHumidity
          key={index}
          HumidityDatas={item}
          index={index}
        />
      ))}
    </GridContainer>
  );
};

const TempChartWrapper = styled.div<{ $columns: number }>`
  grid-column-start: 2; 
  grid-column-end: -1; 
  width: 100%;
`;

const TempLabel = styled.div<{ $columns: number; $index: number }>`
  grid-column-start: ${props => props.$index}; 
  text-align: center;
  white-space: nowrap;
  align-self: start;
  margin-top: 30px;
`;

const GridContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: 120px repeat(${props => props.$columns - 1}, minmax(80px, 1fr));
  gap: 15px;
  width: 94%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0 35px 0 35px;
  font-size: 20px;
`;

const TemperatureLabel = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  align-self: start;
  margin-top: 30px;
`;

export default Hourly;
