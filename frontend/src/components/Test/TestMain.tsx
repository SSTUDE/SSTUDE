import React from 'react'
import styled from 'styled-components';

const TestMain = () => {
  const currentDate = new Date();
  
  // 현재 시간을 "10:30AM" 형식으로 표시
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const Time = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  // 현재 날짜를 "2023.10.20(금)" 형식으로 표시
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysInKorean[currentDate.getDay()];
  const DateString = `${year}.${month}.${day}(${dayOfWeek})`;

  return (
    <Wrap>
      <LeftContainer>
        <Button>버튼1</Button>
        <Button>버튼2</Button>
        <Button>버튼3</Button>
      </LeftContainer>
      <CenterSide>
        <Text>좋은 아침, 파이썬</Text>
      </CenterSide>
      <RightSide>
        <TimeText>{Time}</TimeText>
        <DateText>{DateString}</DateText>
      </RightSide>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`

const LeftContainer = styled.div` 
  display: grid(2f);
  width: 28.8%;
  height: 100%;
  border: 1px solid #fff;
  /* background-color: lightblue; */
`

const CenterSide = styled.div`
  width: 42.4%;
  height: 100%;
  border: 1px solid #fff;
  /* background-color: lightgray */
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 28.8%;
  height: 100%;
  border: 1px solid #fff;
  /* background-color: lightsalmon; */
  padding: 20px;
`

const DateText = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  color: #fff;
`

const TimeText = styled.div`
  font-size: 24px;
  color: #fff;
`

const Text = styled.div`
  font-size: 24px;
  color: #fff;
  margin: 15px;
`

const Button = styled.button`
  width: 150px;
  height: 150px;
  background-color: gray;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  margin: 20px;

  &:hover {
    background-color: darkgray;
  }
`

export default TestMain