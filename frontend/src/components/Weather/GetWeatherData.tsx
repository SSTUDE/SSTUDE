import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeatherData } from "../../apis/api";

type WeatherDataResponse = {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
};

const GetWeatherData = () => {
  const [data, setData] = useState<WeatherDataResponse[] | null>(null);
  
  const day = new Date();
  const hour = day.getHours(); 
  const minutes = day.getMinutes();

  // 시간이 05:00를 지나지 않았다면 전날
  if (hour < 5) {
    day.setDate(day.getDate() - 1);
  }

  const year = day.getFullYear(); 
  const month = (day.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더한다.
  const date = day.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}${month}${date}`;

  // 현재 시간을 기점으로 이후 데이터만 사용하기 위해
  const currentTime = `${hour.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;

  const fetchData = async () => {
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formattedDate,
        base_time: "0500",
        nx: 86,
        ny: 95
      });

      console.log(response);
      const items = response.response.body.items.item;

      // 현재 시간 이후의 데이터만 필터링.
      const futureData = items.filter((item: WeatherDataResponse) => item.fcstTime >= currentTime);
      setData(futureData);
      console.log(futureData);

    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {/* {data ? (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid white', padding: '8px' }}>예측 날짜</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>예측 시간</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>예측 온도</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid white', padding: '8px' }}>{item.fcstDate}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{item.fcstTime}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{item.fcstValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "데이터가 없음"
      )} */}
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  overflow: auto;
`

export default GetWeatherData;
