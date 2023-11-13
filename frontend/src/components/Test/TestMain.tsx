import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate(); 


  return (
    <Wrap>
      <LeftContainer>
        <Button onClick={()=>{navigate('/')}}>초기화면</Button>
        <Button>버튼2</Button>
        <Button>버튼3</Button>
      </LeftContainer>
      <MainSide>
        <MainTop>
          {/* <DateTime/> */}
          <div>
            시간, 날짜 정보 들어갈거임
          </div>
        </MainTop>
        <MainBottom>
          {/* <Weather/> */}
        </MainBottom>
      </MainSide>
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
  border-right: 1px solid #fff;
`

const MainSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 71.2%; 
  height: 100%;
  padding: 20px;
`

const MainTop = styled.div`
  width: 100%;
  height: 15%;
  /* background-color: lightblue; */

  >div {
    text-align: center;
    font-size: 30px;
  }
`

const MainBottom = styled.div`
  width: 100%;
  height: 85%;
`

const Button = styled.button`
  width: 100px;
  height: 100px;
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