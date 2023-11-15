import { busStops } from './types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { images } from '../../constants/images';
import MainButton from '../Personal/Main/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import React, { useEffect, useRef, useState } from 'react';
import { busStopToServer, gpsToServer, setBusStop } from './BusSlice';

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStation, setSelectedStation] = useState<busStops | null>(null);
  const [markers, setMarkers] = useState<Map<string, kakao.maps.Marker>>(new Map());
  const gps = useSelector((state: RootState) => state.bus.gps);
  const busStops = useSelector((state: RootState) => state.bus.busStops);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("KakaoMap: useEffect 실행");
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
            const stationPosition = new kakao.maps.LatLng(parseFloat(station.latitude), parseFloat(station.longitude));
            const markerImageSrc = selectedStation && selectedStation.nodeId === station.nodeId ? images.map.bus_select : images.map.bus;
            const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOption);
            const stationMarker = new kakao.maps.Marker({
              position: stationPosition,
              image: markerImage,
              title: station.nodeName,
              map: map,
            });

            newMarkers.set(station.nodeId, stationMarker);

            kakao.maps.event.addListener(stationMarker, 'click', () => {
              setSelectedStation(prevStation => {
                if (prevStation) {
                  const prevMarker = markers.get(prevStation.nodeId);
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
    console.log("KakaoMap: filterBus 실행", selectedStation);
    if (selectedStation) {
      dispatch(setBusStop(selectedStation));
      dispatch(busStopToServer(selectedStation));
      navigate('/buslist');
    }
  };
  const reResponse = () => {
    console.log("카카오맵에서 서버로 요청 함수 호출")
    dispatch(gpsToServer());
  };

  return (
    <Container>
      <MainButton />
      <Spacer />
      <MapDiv ref={mapRef} />
      <StationList>
        <Pagination>
          <PageButton onClick={filterBus} isActive={!!selectedStation}>
            버스 목록</PageButton>
        </Pagination>
        <Pagination>
          <PageButton onClick={reResponse}>정류장 갱신</PageButton>
        </Pagination>
        {busStops?.map((station) => (
          <StationName
            key={station.nodeId}
            onClick={() => setSelectedStation(station)}
            selected={station === selectedStation}
          >
            {station.nodeName}
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
`;

const StationList = styled.div`
  width: 29vh;
  padding: 10px;
`;

const StationName = styled.div<{ selected?: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #484e5a;
  background-color: ${(props) => (props.selected ? '#94c9e4' : 'transparent')};
  color: ${(props) => (props.selected ? 'black' : 'white')};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Pagination = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const PageButton = styled.p<{ isActive?: boolean }>`
  padding: 15px 30px;
  margin: 5px;
  background-color: ${(props) => (props.isActive ? '#94c9e4' : 'white')};
  color: ${(props) => (props.isActive ? 'black' : 'black')};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
`;

export default KakaoMap;
