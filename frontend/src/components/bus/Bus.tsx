import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { tadaBusRealTime } from './BusSlice';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { BusRealTimeData, TimeCircleProps } from './types';

function Bus() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const { busStop, busRealTime, loading } = useSelector(
    (state: RootState) => state.bus,
    shallowEqual
  );

  useEffect(() => {
    //NOTE - 나중에 따로 빼서 일괄적으로 관리하고 여긴 리덕스에서 받아오기만 할거임
    dispatch(tadaBusRealTime())
    // const id = setInterval(() => {
    //   dispatch(tadaBusRealTime());
    // }, 30000);
    // setIntervalId(id);

    // return () => {
    //   if (intervalId) clearInterval(intervalId);
    // };
  }, [dispatch]);

  const toBusDetail = () => {
    navigate("/busdetail");
  };

  const formatTime = (seconds: number): number => {
    return Math.floor(seconds / 60);
  };

  const sortedBusRealTime = busRealTime ? [...busRealTime].sort((a, b) => a.arrtime - b.arrtime) : [];

  const renderBusInfo = () => {
    if (loading) {
      return ;
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
      return <Message onClick={toBusDetail}>버스 정보가 없습니다.</Message>;
    }
  };

  return (
    <BusContainer>
      <BusInfo onClick={toBusDetail}>
        {renderBusInfo()}
      </BusInfo>
    </BusContainer>
  );
}

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
  font-size: 1.3rem;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 1.3rem;
`

export default Bus;
