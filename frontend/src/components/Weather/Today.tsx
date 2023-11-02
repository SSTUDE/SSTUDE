import React from 'react'
import styled from 'styled-components';
import { ReactComponent as SunWithCloud } from '../../assets/images/sun_with_cloud.svg';
import { ReactComponent as Humidity } from '../../assets/images/humidity.svg';
import { ReactComponent as Umbrella } from '../../assets/images/umbrella.svg';
import { ReactComponent as Wind } from '../../assets/images/Wind.svg';
 

const Today = () => {
  return (
    <Container>
        <LeftTop>
          <SvgContainer>
            <SunSvg/>
            <div>
              <span>18ºC</span>
              <span>밝음</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <UmbSvg/>
            <div>
                <span>60%</span>
                <span>11시</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <HumSvg/>
            <div>
                <span>70%</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <WindSvg/>
            <div>
                <span>2.5</span>
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

const SunSvg = styled(SunWithCloud)`
  width: 130px;
  height: 130px;
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