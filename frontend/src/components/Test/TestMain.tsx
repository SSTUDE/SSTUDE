import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { findNearestSFGridItem } from '../Weather/Grid';

const TestMain = () => {
  // 오디오 요소에 대한 참조 생성
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 클릭 이벤트 핸들러
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    // 전역 클릭 이벤트 리스너 추가
    window.addEventListener('click', playSound);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('click', playSound);
    };
  }, []);

  return (
    <div>
      <audio src="/assets/sounds/blop.mp3" ref={audioRef}></audio>
    </div>
  );
};

const BTN = styled.button`
  width: 300px;
  height: 300px;
`

export default TestMain