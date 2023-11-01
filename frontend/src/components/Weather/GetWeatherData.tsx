import React, { useEffect, useState } from 'react';
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

  const fetchData = async () => {
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: "20231101",
        base_time: "0500",
        nx: 86,
        ny: 95
      });
  
      // console.log(response);
      // console.log(response.response.body.items.item)

      // response 안의 body 안의 items를 확인하여 category가 TMP인 데이터만 필터링
      const tmpData = response.response.body.items.item.filter((item: WeatherDataResponse) => item.category === "TMP");
  
      setData(tmpData);
      console.log(tmpData);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
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
      )}
    </div>
  );
      }  

export default GetWeatherData;
