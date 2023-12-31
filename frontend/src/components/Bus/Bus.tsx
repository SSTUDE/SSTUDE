import styled from 'styled-components';
import { BusRealTimeData } from './types';
import { useNavigate } from 'react-router';
import { busRealTimeForServer } from './BusSlice';
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

interface BusProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Bus: React.FC<BusProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const { busStop, busSave, busRealTime, loading } = useSelector(
    (state: RootState) => state.bus,
    shallowEqual
  );

  useEffect(() => {
    dispatch(busRealTimeForServer())

    const id = setInterval(() => {
      dispatch(busRealTimeForServer())
    }, 60000);

    setIntervalId(id);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [dispatch]);

  const formatTime = (seconds: number): number => {
    return Math.floor(seconds / 60);
  };

  const sortedBusRealTime = busRealTime ? [...busRealTime].sort((a, b) => a.arrivalTime - b.arrivalTime) : [];

  const renderBusInfo = () => {
    if (loading) {
      return;
    } else if (!busStop) {
      return <Message>정거장을 선택해주세요.</Message>;
    } else if (busStop && !busRealTime) {
      return <Message>현재 도착 정보가 없습니다.</Message>;
    } else if (sortedBusRealTime && sortedBusRealTime.length > 0) {
      const filteredBusRealTime = sortedBusRealTime.filter(bus =>
        busSave.includes(bus.routeId)
      );
      const firstFourBusTimes = filteredBusRealTime.slice(0, 4);
      return (
        <BusInfoList>
          {firstFourBusTimes.map((bus: BusRealTimeData, index: number) => (
            <BusInfoItem key={index}>
              <TimeIndicator>
                <TimeCircle>{formatTime(bus.arrivalTime)}</TimeCircle>
              </TimeIndicator>
              <BusDetails>
                <BusId routeType={bus.routeType}>
                  <BusNum>

                    {bus.routeNo}
                  </BusNum>
                  <BusIdBun>번</BusIdBun>
                </BusId>
                <BusStopCount>
                  {bus.arrivalPrevStationCount} 정거장
                </BusStopCount>
              </BusDetails>
            </BusInfoItem>
          ))}

        </BusInfoList>
      );
    } else {
      return <Message >도착 예정인 버스가 없습니다.</Message>;
    }
  };

  return (
    <BusContainer onClick={onClick}>
      <BusInfo >
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

const TimeCircle = styled.span`
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

const BusNum = styled.div`
white-space: nowrap;
width: auto; 
`

interface BusIdProps {
  routeType: string;
}

const BusId = styled.div<BusIdProps>`
  font-size: 4rem;
  font-weight: bold;
  display: flex;
  align-items: end;
  gap: 10px;
  color: ${props =>
    props.routeType === '3' || props.routeType === '2' ? '#0068b7' :
      props.routeType === '4' ? '#53b332' :
        props.routeType === '5' ? '#f2b70a' :
          props.routeType === '6' || props.routeType === '7' || props.routeType === '8' ? '#e60012' :
            'white'};
`;

const BusIdBun = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 13px;
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
