import React from 'react';
import { WeatherDataCustom } from '../types';
import SkyIcon from './SkyIcon';
import styled from 'styled-components';

type DayCloudProps = {
  dailySky: WeatherDataCustom;
  index: number;
};

const DayCloud: React.FC<DayCloudProps> = ({ dailySky, index }) => {
  // 첫 번째 요소인 경우 "오늘"을 표시합니다.
  if (index === 0) {
    return (
      <th>
        <TodayLabel>
          <span className="label">오늘</span>
        </TodayLabel>
      </th>
    );
  }

  // fcstTime에서 시간 부분만 추출합니다.
  const hour = dailySky.fcstTime.slice(0, 2);

  return (
    <th id={`hourly-${dailySky.fcstDate}${hour}`}>
      <TimeSkyWrap>
        {hour === '00' ? (
          <span className="label">{dailySky.fcstDate === '내일' ? '내일' : '모레'}</span>
        ) : (
          <span className="time">{hour}</span>
        )}
        <SkyIcon dailySky={dailySky} />
      </TimeSkyWrap>
    </th>
  );
};

const TimeSkyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayLabel = styled.div`
  position: relative; // 부모 요소인 TimeSkyWrap에 대해 절대 위치를 사용
  top: 0%; 
  left: 50%;
  transform: translate(-50%, -100%); 
`


export default DayCloud;
