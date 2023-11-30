import React from 'react';
import styled from 'styled-components';
import DayCloud from './DayCloud';
import { WeatherDataCustom } from '../types';
import TempChart from './TempChart';
import DayRatinRate from './DayRatinRate';
import DayRainAmount from './DayRainAmount';
import DayHumidity from './DayHumidity';

type HourlyProps = {
  dailySky: WeatherDataCustom[];
  TempDatas: WeatherDataCustom[];
  RainRateDatas: WeatherDataCustom[];
  RainAmountDatas: WeatherDataCustom[];
  HumidityDatas: WeatherDataCustom[];
  RainTypeDatas: WeatherDataCustom[];
};

const Hourly: React.FC<HourlyProps> = ({ dailySky, TempDatas, RainRateDatas, RainAmountDatas, HumidityDatas, RainTypeDatas }) => {
  const dailySkyWithToday = [ ...dailySky];
  const RainRateWithToday = [ ...RainRateDatas];
  const RainAmountWithToday = [ ...RainAmountDatas];
  const HumidityWithToday = [ ...HumidityDatas];

  return (
    <Container>
    <FixedColumn>
        <TodayLabel>시간</TodayLabel>
        <TempComLabel>기온(°C)</TempComLabel>
        <RainrateLabel>강수확률(%)</RainrateLabel>
        <RainLabel>강수량(mm)</RainLabel>
        <HumidityLabel>습도(%)</HumidityLabel>

      </FixedColumn>
      <GridContainer $columns={dailySkyWithToday.length}>
        {dailySkyWithToday.map((item, index) => (
          <DayCloud 
            key={index} 
            dailySky={item} 
            RainTypeDatas={RainTypeDatas}
            index={index} />
        ))}
        {TempDatas.map((item, index) => (
          <TempLabel
            key={index}
            $columns={dailySkyWithToday.length + 1} 
            $index={index + 1} 
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
    </Container>
  );
};

const TempChartWrapper = styled.div<{ $columns: number }>`
  grid-column-start: 1; 
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
  grid-template-columns: repeat(${props => props.$columns}, minmax(80px, 1fr));
  gap: 15px;
  width: calc(94% - 120px);
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0 35px 0 60px;
  font-size: 20px;
`;

const FixedColumn = styled.div`
  flex-shrink: 0; 
  width: 120px;
  margin-left: 40px;
  font-size: 20px;
`;

const CommonLabel = styled.div`
  text-align: center;
  align-self: start;
  font-weight: bold; 
`;

const TodayLabel = styled(CommonLabel)`
  margin-top: 30px;
`

const TempComLabel = styled(CommonLabel)`
  margin-top: 90px; 
`;

const RainrateLabel = styled(CommonLabel)`
  margin-top: 45px;
`
const RainLabel = styled(CommonLabel)`
  margin-top: 22px;
`
const HumidityLabel = styled(CommonLabel)`
  margin-top: 20px;
`

const Container = styled.div`
  display: grid; 
  grid-template-columns: 120px 1320px; 
  width: 100%;
`

export default Hourly;
