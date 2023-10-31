import React, { useEffect, useState } from 'react';
import { getWeatherData } from "../../apis/api";

const GetWeatherData = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getWeatherData({
        numOfRows: 10,
        pageNo: 1,
        dataType : "JSON",
        base_date: "20231031",
        base_time: "0600",
        nx: 55,
        ny: 127
      });
      setData(response);
      console.log(response);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data ? "데이터 있음" : "데이터가 없음"}
    </div>
  );
}

export default GetWeatherData;
