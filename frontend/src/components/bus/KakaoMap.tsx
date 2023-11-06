import { Station } from './types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React, { useEffect, useRef } from 'react';

// KakaoMap 컴포넌트 정의
const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const gps = useSelector((state: RootState) => state.bus.gps);
  const stations = useSelector((state: RootState) => state.bus.stations);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (mapRef.current && gps) {
          const [lat, lng] = gps;
          const center = new kakao.maps.LatLng(lat, lng);
          const options = {
            center,
            level: 3,
          };
          const map = new kakao.maps.Map(mapRef.current, options);

          // stations 배열을 사용하여 각 정류장 위치에 마커를 생성합니다.
          stations?.forEach((station: Station) => { // Station 타입을 명시적으로 사용합니다.
            const stationPosition = new kakao.maps.LatLng(parseFloat(station.gpslati), parseFloat(station.gpslong));
            const stationMarker = new kakao.maps.Marker({
              position: stationPosition,
              title: station.nodenm, // 마커에 마우스를 올렸을 때 표시될 정류장 이름
            });

            // 마커를 지도에 추가합니다.
            stationMarker.setMap(map);

            // 마커에 마우스를 올렸을 때 정보 창을 표시합니다.
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${station.nodenm}</div>`,
            });
            kakao.maps.event.addListener(stationMarker, 'mouseover', () => {
              infowindow.open(map, stationMarker);
            });
            kakao.maps.event.addListener(stationMarker, 'mouseout', () => {
              infowindow.close();
            });
          });
        }
      });
    }
  }, [gps, stations]); // gps 값 또는 stations 배열이 변경될 때마다 useEffect를 실행합니다.

  return (
    <>
      <div>KakaoMap</div>
      <MapDiv ref={mapRef} />
    </>
  );
};

const MapDiv = styled.div`
  width: 500px;
  height: 400px;
`;

export default KakaoMap;
