import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const BusList = () => {
    const busList = useSelector((state: RootState) => state.bus.busList);
  
    const validBusList = busList ? (Array.isArray(busList) ? busList : [busList]) : [];
    console.log(validBusList)
  
    return (
      <div>
        {validBusList.length > 0 ? (
          <ul>
            {validBusList.map((bus, index) => (
              <li key={index}>
                {bus && `버스 번호: ${bus.routeno}, 도착 예정 시간: ${bus.arrtime}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>버스 정보가 없습니다.</p>
        )}
      </div>
    );
  };
  
  export default BusList;
  