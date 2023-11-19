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
        {/* 여기에 고정될 첫 번째 열의 내용을 넣습니다 */}
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
            $columns={dailySkyWithToday.length + 1} // TempLabel 시작점을 각각 2로 설정 
            $index={index + 1} // 첫 번째 열을 "오늘"로 고려하여 +2를 합니다.
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

// TempChartWrapper 스타일
const TempChartWrapper = styled.div<{ $columns: number }>`
  grid-column-start: 1; // 두 번째 열부터 시작
  grid-column-end: -1; // 마지막 열까지
  width: 100%;
`;

// TempLabel 스타일
const TempLabel = styled.div<{ $columns: number; $index: number }>`
  grid-column-start: ${props => props.$index}; // 각 TempLabel이 시작할 열을 지정
  text-align: center;
  white-space: nowrap;
  align-self: start; // 라벨을 그리드 아이템의 상단에 배치합니다.
  margin-top: 30px;
`;

// GridContainer 스타일
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
  /* background-color: lightcoral; */
`;

// 고정될 첫 번째 열
const FixedColumn = styled.div`
  flex-shrink: 0; 
  width: 120px;
  /* background-color: lightblue; */
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
  grid-template-columns: 120px 1320px; // 첫 번째 열은 FixedColumn의 너비, 두 번째 열은 나머지 공간
  width: 100%;
`

export default Hourly;
