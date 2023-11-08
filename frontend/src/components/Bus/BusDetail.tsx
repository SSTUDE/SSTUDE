import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gpsToServer, tadaBusStop } from './BusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const BusDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { busStop, loading, error, gps } = useSelector((state: RootState) => state.bus);
  const navigate = useNavigate();

  useEffect(() => {
    //NOTE - 리덕스에서 기존 데이터 받아와서 자세히 출력
  }, [dispatch]);

  const handleDetailClick = () => {
    if (gps) {
      dispatch(gpsToServer());
      //NOTE - 아래껀 서버에서 api 받아오는거 실패시 직접 버스 정거장 데이터 끌고오는 용도
      dispatch(tadaBusStop());
      navigate('/kakaomap');
    }
  };

  return (
    <>
      <button onClick={handleDetailClick}>정거장 선택</button>
      <div>
        <h1>버스 정보</h1>
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : error ? (
          <p>오류 발생: {error}</p>
        ) : (
          <pre>{JSON.stringify(busStop, null, 2)}</pre>
        )}
      </div>
    </>
  )
}

export default BusDetail