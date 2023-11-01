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
            <SunWithCloud/>
            <div>
              <span>18ºC</span>
              <span>밝음</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <Umbrella/>
            <div>
                <span>60%</span>
                <span>11시</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <Humidity/>
            <div>
                <span>70%</span>
            </div>
          </SvgContainer>
          <SvgContainer>
            <Wind/>
            <div>
                <span>2.5 m/s</span>
            </div>
          </SvgContainer>
        </LeftTop>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid #fff;
  text-align: center;
  display: flex;
  align-items: center;
`

const LeftTop = styled.div`
  width: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: space-evenly;
`

const SvgContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    
    
    :first-child {
      font-size: 70px;
      font-weight: bold;
    }

    :nth-child(2) {
      font-size: 50px;
    }
  
  span {
    margin: 5px;
    padding-left: 20px;
  }

  }
`


export default Today