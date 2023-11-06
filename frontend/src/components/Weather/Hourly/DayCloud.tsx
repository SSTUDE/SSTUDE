import React from 'react';
import { WeatherDataCustom } from '../types';
import SkyIcon from './SkyIcon';
import styled from 'styled-components';

type DayCloudProps = {
  dailySky: WeatherDataCustom;
  index: number;
};

const DayCloud: React.FC<DayCloudProps> = ({ dailySky, index }) => {
  const day = ['내일', '모레']; 
  const dayE = 'today'; 

  // fcstTime에서 시간 부분만 추출합니다.
  const hour = dailySky.fcstTime.slice(0, 2);

  return (
    <th
      key={index} 
      id={`hourly-${dailySky.fcstDate}${hour}`}
      className={`styles.th`}
    >
      <TimeSkyWrap>
        {hour === '00' ?
        (
          <span className={`label ${dayE}`}>{day[0]}</span>
        ) : (
          <span className={`time ${dayE}`}>{hour}</span>
        )}
        <SkyIcon/>
      </TimeSkyWrap>
    </th>
  );
};

const TimeSkyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default DayCloud;
