import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Humidity } from '../../../assets/images/humidity.svg';
import { ReactComponent as Umbrella } from '../../../assets/images/umbrella.svg';
import { ReactComponent as Wind } from '../../../assets/images/Wind.svg';
import { WeatherDataCustom } from '../types';
import SkyToday from './SkyToday';

type TodayProps = {
  NowDatas: WeatherDataCustom[];
};

const Today: React.FC<TodayProps> = ({ NowDatas }) => {
  return (
    <Container>
        <LeftTop>
          <SvgContainer>
            <SkyToday NowDatas={NowDatas}/>
          </SvgContainer>
          <SvgContainer>
            <UmbSvg/>
            <div>
                <span>{NowDatas[4].fcstValue}%</span>
                <span>{NowDatas[4].fcstTime.slice(0, 2)}시</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <HumSvg/>
            <div>
                <span>{NowDatas[1].fcstValue}%</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <WindSvg/>
            <div>
                <span>{NowDatas[2].fcstValue}</span>
                <span>m/s</span>
            </div>
          </SvgContainer>
        </LeftTop>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
  display: flex;
  align-items: center;
  margin: 10px 0;
`

const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const SvgContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    
    
    :first-child {
      font-size: 50px;
      font-weight: bold;
    }

    :nth-child(2) {
      font-size: 35px;
    }
  
  span {
    margin: 5px;
    padding-left: 20px;
  }

  }
`

const HumSvg = styled(Humidity)`
  width: 87px;
  height: 130px;
`

const WindSvg = styled(Wind)`
  width: 130px;
  height: 114px;
`

const UmbSvg = styled(Umbrella)`
  width: 130px;
  height: 130px;
`


export default Today
