import React, { useState } from 'react'
import styled from 'styled-components';
import { ReactComponent as SunWithCloud } from '../../assets/images/sun_with_cloud.svg';

const Week = () => {
  const [data, setdata] = useState([1,2,3,4,5,6,7])


  return (
    <Container>
        <StyledList>
          {data.map((item, index) => (
            <li key={index}>
              <WeatherContainer>
                <div>
                  <strong>토</strong>
                  <p>11.02</p>
                </div>
                <DayContainer>
                  <div>
                    <SunSvg/>
                    <p>30%</p>
                  </div>
                  <div>
                    <SunSvg />
                    <p>30%</p>
                  </div>
                </DayContainer>
                  <DayContainer>
                    <strong>14ºC</strong>
                    <strong>23ºC</strong>
                  </DayContainer>
              </WeatherContainer>
            </li>
          ))}
        </StyledList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 30%;
  border: 1px solid #fff;

  >h2{
    margin: 10px 10px;
  }
`

const StyledList = styled.ul`
  list-style-type: none; /* 불릿 제거 */
  display: flex; 
  justify-content: space-around;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  >div {
    font-size: 21px;

    >p {
      margin: 5px 0px;
    }

    >strong {
    margin: 5px 0px;
  }
  }
  
  
`

const DayContainer = styled.div`
  display: flex;
  justify-content: space-around;
`


const SunSvg = styled(SunWithCloud)`
  width: 65px;
  height: 65px;
  margin: 0 10px;
`




export default Week