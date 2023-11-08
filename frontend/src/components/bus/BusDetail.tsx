import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gpsToServer, tadaBusStop } from './BusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import { BusRealTimeData, TimeCircleProps } from './types';

const BusDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gps, busStop, busRealTime, loading } = useSelector((state: RootState) => state.bus);
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(tadaBusRealTime)
  }, [dispatch]);

  const toSelectBusStop = () => {
    if (gps) {
      dispatch(gpsToServer());
      //NOTE - 아래껀 서버에서 api 받아오는거 실패시 직접 버스 정거장 데이터 끌고오는 용도
      dispatch(tadaBusStop());
      navigate('/kakaomap');
    }
  };

  
  const formatTime = (seconds: number): number => {
    return Math.floor(seconds / 60);
  };

  const sortedBusRealTime = busRealTime ? [...busRealTime].sort((a, b) => a.arrtime - b.arrtime) : [];

  const renderBusInfo = () => {
    if (loading) {
      return <Message>데이터를 불러오는 중...</Message>;
    } else if (!busStop) {
      return <Message>정거장을 선택해주세요.</Message>;
    } else if (busStop && !busRealTime) {
      return <Message>현재 도착 정보가 없습니다.</Message>;
    } else if (sortedBusRealTime && sortedBusRealTime.length > 0) {
      const firstFourBusTimes = sortedBusRealTime.slice(0, 4);
      return (
        <BusInfoList>
          {firstFourBusTimes.map((bus: BusRealTimeData, index: number) => (
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
      );
    } else {
      return <Message>버스 정보가 없습니다.</Message>;
    }
  };

  return (
    <>
      <Btn onClick={toSelectBusStop}>정거장 선택</Btn>
      <BusContainer>
        {renderBusInfo()}
    </BusContainer>
    </>
  )
}

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`


const BusContainer = styled.div`
  padding: 20px;
  margin: 20px;
  max-width: 30vh;
`;

const BusInfo = styled.div`
  cursor: pointer;
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
  width: ${({ timeLeft }) => 50 + (30 - timeLeft) * 0.5}px;
  height: ${({ timeLeft }) => 50 + (30 - timeLeft) * 0.5}px;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ timeLeft }) => 12 + (30 - timeLeft) * 0.5}px;
  font-weight: bold;
  font-size: 2rem;
  line-height: ${({ timeLeft }) => 15 + (30 - timeLeft) * 0.5}px;
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
  font-size: 1.3rem;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 1.3rem;
`

export default BusDetail