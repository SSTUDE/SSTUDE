import React from 'react'
import styled from 'styled-components';
import { ReactComponent as SunWithCloud } from '../../../assets/images/sun_with_cloud.svg';
import { BsSunFill, BsCloudSunFill, BsCloudRainFill } from 'react-icons/bs'

type SkyWeekProps = {
  skyData : string;
}

const SkyWeek : React.FC<SkyWeekProps> = ({ skyData }) => {
    // 날씨 상태에 따라 아이콘을 선택하는 함수
    const getWeatherIcon = (skyCondition: string) => {
      if (skyCondition.includes('맑음')) {
        return <StyledSunFill size={45}/>;
      } else if (skyCondition.includes('구름많음')) {
        return <SunSvg />;
      } else if (skyCondition.includes('흐림')) {
        return <StyledCloudRainFill size={45}/>;
      } else if (skyCondition.includes('비') || skyCondition.includes('소나기')) {
        // '비'나 '소나기'를 포함하는 경우
        return <BsCloudRainFill size={45}/>;
      } else {
        // 알 수 없는 날씨 상태일 경우
        return null;
      }
    };

  return (
    <>
      {getWeatherIcon(skyData)}
    </>
  )
}

const SunSvg = styled(SunWithCloud)`
  width: 45px;
  height: 45px;
  margin-top: 5px;
`

const StyledSunFill = styled(BsSunFill)`
  color: #ff9500;
  margin-top: 5px;
`;

const StyledCloudSunFill = styled(BsCloudSunFill)`
  color: #c5c5c5;
  margin-top: 5px;
`;

const StyledCloudRainFill = styled(BsCloudRainFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;


export default SkyWeek;