import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { KAKAO_MAP } from '../../apis/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// KakaoMap 컴포넌트 정의
const KakaoMap = () => {
  // mapRef는 DOM에 접근하기 위한 ref 객체를 생성합니다. 이를 통해 카카오 맵을 렌더링할 HTML 요소를 참조합니다.
  const mapRef = useRef(null);
  const gps = useSelector((state: RootState) => state.bus.gps); // state의 타입을 RootState로 명시합니다.

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 카카오 맵 스크립트를 동적으로 로드합니다.
  useEffect(() => {
    // script 태그를 생성합니다.
    const script = document.createElement('script');
    script.async = true; // 스크립트가 비동기적으로 로드되도록 설정합니다.
    script.src = KAKAO_MAP; // 스크립트의 소스로 KAKAO_MAP 상수를 사용합니다. 이 상수는 카카오 맵의 URL을 담고 있습니다.
    document.head.appendChild(script); // 생성한 스크립트 태그를 문서의 head에 추가합니다.

    // 스크립트가 로드되면 실행될 콜백 함수를 정의합니다.
    script.onload = () => {
      // 카카오 맵이 로드되면 실행될 콜백 함수를 정의합니다.
      window.kakao.maps.load(() => {
        // mapRef.current가 존재하는 경우에만 맵을 초기화합니다.
        if (mapRef.current && gps) { // gps 값이 있을 때만 맵을 초기화합니다.
          const [lat, lng] = gps; // GPS 좌표를 분해 할당합니다.
          // 맵의 중심 좌표를 설정합니다.
          const center = new window.kakao.maps.LatLng(lat, lng);
          // 맵 옵션을 설정합니다.
          const options = {
            center, // 맵의 중심 좌표
            level: 3, // 확대 레벨
          };
          // 맵 인스턴스를 생성합니다.
          const map = new window.kakao.maps.Map(mapRef.current, options);

          // 클러스터러를 생성합니다.
          const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 10,
          });

          // 마커 배열을 생성합니다.
          // const markers = [
          //   // 예시 마커입니다. 실제 데이터에 맞게 마커를 생성해야 합니다.
          //   new window.kakao.maps.Marker({
          //     position: new window.kakao.maps.LatLng(lat, lng),
          //   }),
          // ];

          // // 클러스터러에 마커들을 추가합니다.
          // clusterer.addMarkers(markers);
        }
      });
    };
  }, []); 

  // 컴포넌트가 렌더링할 JSX를 반환합니다.
  return (
    <>
      <div>KakaoMap</div>
      <MapDiv ref={mapRef}></MapDiv> {/* styled-components 라이브러리를 사용하여 스타일링된 div 요소 */}
    </>
  );
};

// styled-components 라이브러리를 사용하여 MapDiv 컴포넌트를 스타일링합니다.
const MapDiv = styled.div`
  width: 500px; // 너비를 500px로 설정합니다.
  height: 400px; // 높이를 400px로 설정합니다.
`;

export default KakaoMap; // KakaoMap 컴포넌트를 export합니다.
