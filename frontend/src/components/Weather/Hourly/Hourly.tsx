import React from 'react';
import styled from 'styled-components';
import DayCloud from './DayCloud';
import { WeatherDataCustom } from '../types';
import TempChart from './TempChart';

type HourlyProps = {
  dailySky: WeatherDataCustom[];
  TempDatas: WeatherDataCustom[];
};

interface GridContainerProps {
  columns: number;
}

const Hourly: React.FC<HourlyProps> = ({ dailySky, TempDatas }) => {
  const dailySkyWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...dailySky];

  return (
    <GridContainer columns={dailySkyWithToday.length + 1}> {/* 여기에 +1을 해서 전체 열의 수를 하나 늘립니다. */}
      {dailySkyWithToday.map((item, index) => (
        <DayCloud key={index} dailySky={item} index={index} />
      ))}
      {TempDatas.map((item, index) => (
        <TempLabel
          key={index}
          columns={dailySkyWithToday.length + 1} // TempLabel 시작점을 각각 2로 설정 
          index={index + 2} // 첫 번째 열을 "오늘"로 고려하여 +2를 합니다.
        >
          {item.fcstValue}°
        </TempLabel>
      ))}
      <TempChartWrapper columns={dailySkyWithToday.length + 1}> {/* TempChartWrapper 시작점을 2로 설정 */}
        <TempChart TempDatas={TempDatas} />
      </TempChartWrapper>
    </GridContainer>
  );
};

// TempChartWrapper 스타일
const TempChartWrapper = styled.div<GridContainerProps>`
  grid-column-start: 2; // 두 번째 열부터 시작
  grid-column-end: -1; // 마지막 열까지
  width: 100%;
`;

// TempLabel 스타일
const TempLabel = styled.div<{ columns: number; index: number }>`
  grid-column-start: ${props => props.index}; // 각 TempLabel이 시작할 열을 지정
  text-align: center;
  white-space: nowrap;
  align-self: start; // 라벨을 그리드 아이템의 상단에 배치합니다.
  margin-top: 30px;
`;

// GridContainer 스타일
const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, minmax(80px, 1fr));
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Hourly;
