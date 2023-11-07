import React, { useEffect, useRef, useState } from 'react';
import { images } from '../../constants/images';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Station } from './types';

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [markers, setMarkers] = useState<Map<string, kakao.maps.Marker>>(new Map());
  const gps = useSelector((state: RootState) => state.bus.gps);
  const stations = useSelector((state: RootState) => state.bus.stations);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (mapRef.current && gps) {
          const [lat, lng] = gps;
          const center = new kakao.maps.LatLng(lat, lng);
          const options = { center, level: 3 };
          const map = new kakao.maps.Map(mapRef.current, options);

          const imageSize = new kakao.maps.Size(60, 60);
          const imageOption = { offset: new kakao.maps.Point(30, 30) };

          const homeMarkerImage = new kakao.maps.MarkerImage(images.map.home, imageSize, imageOption);
          new kakao.maps.Marker({
            position: center,
            image: homeMarkerImage,
            map: map,
          });

          const newMarkers = new Map();
          stations?.forEach((station: Station) => {
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
  }, [gps, stations, selectedStation]);

  return (
    <>
      <MapDiv ref={mapRef} />
      <StationList>
        {stations?.map((station) => (
          <StationName
            key={station.nodeid}
            onClick={() => setSelectedStation(station)}
            selected={station === selectedStation}
          >
            {station.nodenm}
          </StationName>
        ))}
      </StationList>
    </>
  );
};

const MapDiv = styled.div`
  width: 50%;
  height: 100%;
`;

const StationList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  color: white;
`;

const StationName = styled.div<{ selected?: boolean }>`
  padding: 5px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.selected ? '#a0a0a0' : 'transparent')};
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default KakaoMap;
