import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { findNearestSFGridItem } from '../Weather/Grid';

const TestMain = () => {
  const handleButtonClick = () => {
    // 예시 위도와 경도
    const latitude = 36.10774883999876;
    const longitude = 128.4220535380925;

    const nearestItem = findNearestSFGridItem(latitude, longitude);
    console.log(nearestItem);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>가장 가까운 위치 찾기</button>
    </div>
  );
};

export default TestMain