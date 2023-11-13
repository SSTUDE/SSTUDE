import React from 'react'
import styled from 'styled-components';
import {
  FaRegFaceGrinSquint,
  FaRegFaceSmile,
  FaRegFaceFrown, 
  FaRegFaceDizzy } from 'react-icons/fa6'


  type AirIconProps = {
    pm10Grade: string;
    pm25Grade: string
  };


const AirIcon : React.FC<AirIconProps> = ({ pm10Grade, pm25Grade  }) => {
  // 아이콘 결정 로직
  const getIconForGrade = (grade: string) => {
    switch (grade) {
      case '1':
        return { icon: <FaRegFaceGrinSquint size={130}/>, description: '좋음' };
      case '2':
        return { icon: <FaRegFaceSmile size={130}/>, description: '보통' };
      case '3':
        return { icon: <FaRegFaceFrown size={130}/>, description: '나쁨' };
      case '4':
        return { icon: <FaRegFaceDizzy size={130}/>, description: '심각' };
      default:
        return { icon: null, description: '정보 없음' };
    }
  };

  //
  const pm10Data = getIconForGrade(pm10Grade);
  const pm25Data = getIconForGrade(pm25Grade);

  return (
    <AirCon>
      <AirInfoCoc>
        {pm10Data.icon}
        <PmText>
          <div>미세먼지</div>
          <div>{pm10Data.description}</div>
        </PmText>
      </AirInfoCoc>
      <AirInfoCoc>
        {pm25Data.icon}
        <PmText>
          <div>초미세먼지</div>
          <div>{pm25Data.description}</div>
        </PmText>
      </AirInfoCoc>
    </AirCon>
  )
}

const AirCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const AirInfoCoc = styled.div`
  display: flex;
  margin-left: 40px;
`

const PmText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-left: 50px;

:first-child {
  font-size: 25px;
}

:nth-child(2) {
  font-size: 50px;
}
`

export default AirIcon