import React from 'react';
import { WeatherDataCustom } from '../types';
import SkyIcon from './SkyIcon';
import styled from 'styled-components';

type DayCloudProps = {
  dailySky: WeatherDataCustom;
  RainTypeDatas: WeatherDataCustom[];
  index: number;
};

const DayCloud: React.FC<DayCloudProps> = ({ dailySky, RainTypeDatas, index }) => {
  const RainData = RainTypeDatas.find(rain => rain.fcstDate === dailySky.fcstDate && rain.fcstTime === dailySky.fcstTime) 
    || {} as WeatherDataCustom;

  const dateLabel = getDateLabel(dailySky.fcstDate);
  const hour = dailySky.fcstTime.slice(0, 2);

  function getDateLabel(fcstDate: string) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const twoDaysAfter = new Date(today);
    twoDaysAfter.setDate(twoDaysAfter.getDate() + 3);

    const format = (date: Date): string => {
      return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    };

    if (format(tomorrow) === fcstDate) {
      return '내일';
    } else if (format(dayAfterTomorrow) === fcstDate) {
      return '모레';
    } else if (format(twoDaysAfter) === fcstDate) {
      return '글피';
    }
    return null;
  }

  return (
    <TimeSkyWrap>
      {hour === '00' && dateLabel ? (
        <span className="label">{dateLabel}</span>
      ) : (
        <span className="time">{hour}시</span>
      )}
      <SkyIcon 
        dailySky={dailySky}
        RainData={RainData}
        size={30}
      />
    </TimeSkyWrap>
  );
};

const TimeSkyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;

  .label {
    font-weight: bold;
  }
`;

export default DayCloud;
