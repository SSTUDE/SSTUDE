import { busStops } from './types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { images } from '../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import React, { useEffect, useRef, useState } from 'react';
import { busStopToServer, gpsToServer, setBusStop, tadaBusList, tadaBusStop } from './BusSlice';

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStation, setSelectedStation] = useState<busStops | null>(null);
  const [markers, setMarkers] = useState<Map<string, kakao.maps.Marker>>(new Map());
  const gps = useSelector((state: RootState) => state.bus.gps);
  const busStops = useSelector((state: RootState) => state.bus.busStops);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (mapRef.current && gps) {
          const [lat, lng] = gps;
          const center = new kakao.maps.LatLng(lat, lng);
          const options = { center, level: 3 };
          const map = new kakao.maps.Map(mapRef.current, options);

          const imageSize = new kakao.maps.Size(50, 50);
          const imageOption = { offset: new kakao.maps.Point(25, 25) };

          const homeMarkerImage = new kakao.maps.MarkerImage(images.map.home, imageSize, imageOption);
          new kakao.maps.Marker({
            position: center,
            image: homeMarkerImage,
            map: map,
          });

          const newMarkers = new Map();
          busStops?.forEach((station: busStops) => {
            const stationPosition = new kakao.maps.LatLng(parseFloat(station.gpslati), parseFloat(station.gpslong));
            const markerImageSrc = selectedStation && selectedStation.nodeid === station.nodeid ? images.map.bus_select : images.map.bus;
            const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOption);
            const stationMarker = new kakao.maps.Marker({
              position: stationPosition,
              image: markerImage,
              title: station.nodenm,
              map: map,
            });

            newMarkers.set(station.nodeid, stationMarker);

            kakao.maps.event.addListener(stationMarker, 'click', () => {
              setSelectedStation(prevStation => {
                if (prevStation) {
                  const prevMarker = markers.get(prevStation.nodeid);
                  if (prevMarker) {
                    prevMarker.setImage(new kakao.maps.MarkerImage(images.map.bus, imageSize, imageOption));
                  }
                }
                stationMarker.setImage(new kakao.maps.MarkerImage(images.map.bus_select, imageSize, imageOption));
                return station;
              });
            });
          });
          setMarkers(newMarkers);
        }
      });
    }
  }, [gps, busStops, selectedStation]);

  const filterBus = () => {
    if (selectedStation) {
      dispatch(setBusStop(selectedStation));
      dispatch(busStopToServer(selectedStation));
      dispatch(tadaBusList(selectedStation));
      navigate('/buslist');
    }
  };
  const reResponse = () => {
    dispatch(gpsToServer());
    //NOTE - 아래껀 서버에서 api 받아오는거 실패시 직접 버스 정거장 데이터 끌고오는 용도
    dispatch(tadaBusStop());
  };

  return (
    <Container>
      <Spacer />
      <MapDiv ref={mapRef} />
      <StationList>
        <Pagination>
          <PageButton onClick={filterBus}>버스 목록</PageButton>
        </Pagination>
        <Pagination>
          <PageButton onClick={reResponse}>정류장 갱신</PageButton>
        </Pagination>
        {busStops?.map((station) => (
          <StationName
            key={station.nodeid}
            onClick={() => setSelectedStation(station)}
            selected={station === selectedStation}
          >
            {station.nodenm}
          </StationName>
        ))}
      </StationList>
    </Container>
  );
};

const Container = styled.div`
  display: flex; 
  height: 100vh; 
`;

const Spacer = styled.div`
  flex: 0.3; 
`;

const MapDiv = styled.div`
  flex: 0.7; 
  height: 100%; 
`;

const StationList = styled.div`
  width: 29vh; 
  height: 100%; 
  overflow-y: auto; 
  padding: 10px;
  color: white;
  flex-direction: column; 
  justify-content: center; 
`;

const StationName = styled.div<{ selected?: boolean }>`
  padding: 5px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.selected ? '#a0a0a0' : 'transparent')};
  &:hover {
    background-color: #f0f0f0;
  }
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PageButton = styled.p`
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;

`;

export default KakaoMap;