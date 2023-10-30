import React from 'react'
import styled from 'styled-components';

function DateTime() {

  const currentDate = new Date();

  // 현재 시간을 "10:30AM" 형식으로 표시
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
  const Time = `${formattedHours} ${ampm}`;

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
  font-size: 50px;
  font-weight: bold;
  margin: 0;
`;

const AmPm = styled.p`
  font-size: 25px;
  font-weight: 500;
  margin: 0;
`;

const DateNow = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
`;

export default DateTime