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
    <>
    <Times>
    <Tm>{formattedHours}</Tm>
    <div>{ampm}</div>
    </Times>
    <div>{DateString}</div>
    </>
  )
}

const Times = styled.div`
display: inline-flex;
  
`;

const Tm = styled.div`
  font-size:30px;
`;

export default DateTime