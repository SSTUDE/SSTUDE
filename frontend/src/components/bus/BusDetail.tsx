import React from 'react';
import styled from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import DateTime from '../Common/DateTime';
import HelloWorld from '../Common/HelloWorld';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { BusRealTimeData, TimeCircleProps } from './types';
import { gpsToServer, tadaBusStop } from './BusSlice';

const BusDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gps, busStop, busRealTime, loading } = useSelector((state: RootState) => state.bus);
  console.log(busRealTime)
  const navigate = useNavigate();

  const toSelectBusStop = () => {
    if (gps) {
      dispatch(gpsToServer());
      //NOTE - 아래껀 서버에서 api 받아오는거 실패시 직접 버스 정거장 데이터 끌고오는 용도
      // dispatch(tadaBusStop());
      navigate('/kakaomap');
    }
  };

  const formatTime = (seconds: number): number => {
    return Math.floor(seconds / 60);
  };

  const sortedBusRealTime = busRealTime
    ? [...busRealTime].sort((a, b) => a.arrtime - b.arrtime)
    : [];

  const renderBusInfo = () => {
    if (loading) {
      return <Message>데이터를 불러오는 중...</Message>;
    } else if (!busStop) {
      return <Message>정거장을 선택해주세요.</Message>;
    } else if (busStop && !busRealTime) {
      return <Message>도착 예정 버스가 없습니다.</Message>;
    } else if (sortedBusRealTime && sortedBusRealTime.length > 0) {
      const numberOfInfo = Math.ceil(sortedBusRealTime.length / 4);
      return Array.from({ length: numberOfInfo }, (_, index) => (
        <BusInfoList>
          {sortedBusRealTime.slice(index * 4, (index + 1) * 4).map((bus: BusRealTimeData, index: number) => (
            <BusInfoItem key={index}>
              <TimeIndicator>
                <TimeCircle timeLeft={formatTime(bus.arrtime)}>{formatTime(bus.arrtime)}</TimeCircle>
              </TimeIndicator>
              <BusDetails>
                <BusId>
                  {bus.routeno} <br />
                </BusId>
                <BusStopCount>
                  {bus.arrprevstationcnt} 정거장
                </BusStopCount>
              </BusDetails>
            </BusInfoItem>
          ))}
        </BusInfoList>
      ));
    } else {
      return <Message>버스 정보가 없습니다.</Message>;
    }
  };

  return (
    <Container>
      <Header>
        <MenuBtn type="menu" />
        <HelloWorld />
        <DateTime />
      </Header>
      <BusContainer>
        {renderBusInfo()}
      </BusContainer>
      <Btn onClick={toSelectBusStop}>정거장 선택</Btn>
    </Container>
  )
}

const Header = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; 
  
`

const Btn = styled.p`
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 4em;
  font-weight: bold;
  margin: 15px; 
  cursor: pointer; 
`

const BusContainer = styled.div`
  display: flex;       
  align-items: flex-start; 
  justify-content: flex-end;
  padding: 20px;
  margin: 20px;
  gap: 10%;
`;

const BusInfoList = styled.ul`
  margin: 0;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 28px;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: #aaa;
  }
`;

const BusInfoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const TimeIndicator = styled.div`
  position: absolute;
  left: 0px;
`;

const TimeCircle = styled.span<TimeCircleProps>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
  font-weight: bold;
  font-size: 2rem;
  line-height: 27px;
`;

const BusDetails = styled.div`
  margin-left: 40px;
  font-size: 0.9rem;
  color: white;
`;

const BusId = styled.p`
  font-size: 4rem;
  font-weight: bold;
`;

const BusStopCount = styled.p`
  margin-left: 5px;
  font-size: 1.5rem;
  font-weight: normal;
`;

const Message = styled.p`
  font-size: 1.3rem;
`

export default BusDetail