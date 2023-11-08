import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

function Bus() {

  const dispatch = useDispatch<AppDispatch>();
  const { busStop, loading, error } = useSelector((state: RootState) => state.bus);
  const navigate = useNavigate();

  useEffect(() => {
    //NOTE - 서버에서 기존 데이터 호출 + 리덕스에 저장
    // dispatch(fetchBusData());
  }, [dispatch]);

  const handleDetailClick = () => {
    navigate('/busdetail');
  };

  return (
    <>
      <button onClick={handleDetailClick}>버스 상세 정보</button>
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
  );
}

export default Bus;
