import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { TEXT_COLOR } from '../../constants/defaultSlices'

function DateTime() {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentDate(new Date());
    };

    // 현재 시간과 다음 분까지 남은 시간을 계산
    const now = new Date();
    const timeToNextMinute = (60 - now.getSeconds()) * 1000; // 랜더링 되는 과정에서 1초 소요되기 때문에

    // 다음 분까지 남은 시간만큼 지연시킨 후, 매 분마다 업데이트
    setTimeout(() => {
      updateCurrentTime();
      const intervalId = setInterval(updateCurrentTime, 60000); // 1분마다 업데이트
      return () => {
        clearInterval(intervalId);
      };
    }, timeToNextMinute);
  }, []);

  // 현재 시간을 "10:30AM" 형식으로 표시
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;

  // 현재 날짜를 "2023.10.20(금)" 형식으로 표시
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
