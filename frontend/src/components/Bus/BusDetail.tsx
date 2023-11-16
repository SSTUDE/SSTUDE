import React from 'react';
import styled from 'styled-components';
import { gpsToServer } from './BusSlice';
import { BusRealTimeData } from './types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

interface BusProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const BusDetail: React.FC<BusProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { gps, busStop, busRealTime, loading } = useSelector((state: RootState) => state.bus);
  const navigate = useNavigate();

  const toSelectBusStop = () => {
    if (gps) {
      dispatch(gpsToServer());
      navigate('/kakaomap');
    }
  };

  const formatTime = (seconds: number): number => {
    return Math.floor(seconds / 60);
  };

  const sortedBusRealTime = busRealTime
    ? [...busRealTime].sort((a, b) => a.arrivalTime - b.arrivalTime)
    : [];

  const renderBusInfo = () => {
    if (loading) {
      return;
    } else if (!busStop) {
      return <Message>정거장을 선택해주세요.</Message>;
    } else if (busStop && !busRealTime) {
      return <Message>도착 예정 버스가 없습니다.</Message>;
    } else if (sortedBusRealTime && sortedBusRealTime.length > 0) {
      const numberOfInfo = Math.ceil(sortedBusRealTime.length / 4);
      return Array.from({ length: numberOfInfo }, (_, index) => (
        <BusInfoList key={`bus-info-list-${index}`}>
          {sortedBusRealTime.slice(index * 4, (index + 1) * 4).map((bus: BusRealTimeData) => (
            <BusInfoItem key={bus.arrivalPrevStationCount - bus.arrivalTime}>
              <TimeIndicator>
                <TimeCircle >{formatTime(bus.arrivalTime)}</TimeCircle>
              </TimeIndicator>
              <BusDetails>
                <BusId>
                  {bus.routeNo} <br />
                </BusId>
                <BusStopCount>
                  {bus.arrivalPrevStationCount} 정거장
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
    <BusDetailContainer>
      <BusContainer onClick={onClick}>
        {renderBusInfo()}
      </BusContainer>
      <Btn onClick={toSelectBusStop}>정거장 선택</Btn>
    </BusDetailContainer>
  )
}

const BusDetailContainer = styled.div`
  display: flex;
  padding: 20px;
  margin: 20px;
`

const Btn = styled.p`
  align-self: center;
  font-size: 4em;
  font-weight: bold;
  cursor: pointer;
  writing-mode: vertical-rl;
`

const BusContainer = styled.div`
  display: flex;       
  align-items: flex-start; 
  justify-content: flex-start;
  padding: 20px;
  margin: 20px;
  gap: 2%;
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