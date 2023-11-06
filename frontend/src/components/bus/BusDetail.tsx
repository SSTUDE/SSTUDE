import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendGpsData, fetchBusData } from './BusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const BusDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { busData, loading, error, gps } = useSelector((state: RootState) => state.bus);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBusData());
  }, [dispatch]);

  // 버스 상세 정보로 이동하기 전에 GPS 데이터를 서버로 전송합니다.
  const handleDetailClick = () => {
    if (gps) {
      dispatch(sendGpsData());
      navigate('/kakaomap');
    }
  };

  return (
    <>
      <div>
        <h1>버스 정보</h1>
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : error ? (
          <p>오류 발생: {error}</p>
        ) : (
          <pre>{JSON.stringify(busData, null, 2)}</pre>
        )}
      </div>
      <button onClick={handleDetailClick}>정거장 선택</button>
    </>
  )
}

export default BusDetail