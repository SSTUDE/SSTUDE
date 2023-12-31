import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import { TEXT_COLOR } from '../../constants/defaultSlices'

function DateTime() {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentDate(new Date());
    };

    const now = new Date();
    const timeToNextMinute = (60 - now.getSeconds()) * 1000; 

    setTimeout(() => {
      updateCurrentTime();
      const intervalId = setInterval(updateCurrentTime, 60000); 
      return () => {
        clearInterval(intervalId);
      };
    }, timeToNextMinute);
  }, []);

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysInKorean[currentDate.getDay()];
  const DateString = `${year}.${month}.${day}(${dayOfWeek})`;

  return (
    <Wrap>
      <TimeNow>
        <MainP>{formattedHours}</MainP>
        <AmPm>{ampm}</AmPm>
      </TimeNow>
      <DateNow>{DateString}</DateNow>
    </Wrap>
  )
}

const Wrap = styled.div`
  align-items: flex-end;
  display: inline-flex;
  flex-direction: column;
`;

const TimeNow = styled.div`
  align-items: flex-end;
  display: inline-flex;
  align-items: baseline;
`;

const MainP = styled.p`
  font-size: 100px;
  font-weight: bold;
  color: ${TEXT_COLOR}
`;

const AmPm = styled.p`
  font-size: 50px;
  font-weight: 500;
  font-weight: bold;
  color: ${TEXT_COLOR}
`;

const DateNow = styled.p`
  font-size: 40px;
  font-weight: 500;
  color: ${TEXT_COLOR}
`;

export default DateTime;
