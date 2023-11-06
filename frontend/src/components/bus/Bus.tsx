// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBusData } from './BusSlice';
// import { AppDispatch, RootState } from '../../store/store';

// function Bus() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { busData, station, loading, error } = useSelector((state: RootState) => state.bus);
//   const gps: [string, string] = ['126.95584930', '37.53843986'];

//   useEffect(() => {
//     dispatch(fetchBusData(gps));
//   }, [dispatch]);

//   // 렌더링 부분
//   return (
//     <div>
//       <h1>버스 정보</h1>
//       {loading ? (
//         <p>데이터를 불러오는 중...</p>
//       ) : error ? (
//         <p>오류 발생: {error}</p>
//       ) : (
//         <pre>{JSON.stringify(busData, null, 2)}</pre>
//       )}
//     </div>
//   );
// }

// export default Bus;

export default {}
