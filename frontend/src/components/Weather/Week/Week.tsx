import React from 'react'
import SkyWeek from './SkyWeek'
import styled from 'styled-components';
import { MidForecastCombined } from '../types'

type WeekProps = {
  CombinedDatas: MidForecastCombined[];
}

const Week: React.FC<WeekProps> = ({ CombinedDatas }) => {
  const getFormattedDate = (addDays: number) => {
    const today = new Date();
    const targetDate = new Date(today.setDate(today.getDate() + addDays));
    const day = targetDate.getDate().toString().padStart(2, '0');
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[targetDate.getDay()];

    return {
      formattedDate: `${month}.${day}`,
      weekday,
    };
  };

  return (
    <Container>
      <StyledList>
        {CombinedDatas.map((item, index) => {
          const { formattedDate, weekday } = getFormattedDate(index);
          const skyAmData = CombinedDatas[index].wfAm
          const skyPmData = CombinedDatas[index].wfPm
          return (
            <li key={index}>
              <WeatherContainer>
                <div>
                  <strong>{weekday}</strong>
                  <p>{formattedDate}</p>
                </div>
                <DayContainer>
                  <div>
                    <SkyWeek skyData={skyAmData} />
                    <p>{item.rnStAm}%</p>
                  </div>
                  <div>
                    <SkyWeek skyData={skyPmData} />
                    <p>{item.rnStPm}%</p>
                  </div>
                </DayContainer>
                <DayContainer>
                  <strong>{item.taMin}ºC</strong>
                  <strong>{item.taMax}ºC</strong>
                </DayContainer>
              </WeatherContainer>
            </li>
          );
        })}
      </StyledList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 30%;

`

const StyledList = styled.ul`
  list-style-type: none;
  display: flex; 
  justify-content: space-around;
  padding: 0;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 120px;

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

export default Week