import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SFGridItem } from '../components/Weather/types'


// 초기 상태 정의
const initialState: SFGridItem = {
    arePt1: '',
    arePt2: '',
    arePt3: '',
    areaCode: '',
    latitude: '36.10774883999876',
    // latitude: '37.49648606',
    longitude: '128.4220535380925',
    // longitude: '127.02836155',
    nX: '',
    nY: ''
  };


const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    // 위치 업데이트 액션
    updatePosition: (state, action: PayloadAction<SFGridItem>) => {
      state.arePt1 = action.payload.arePt1;
      state.arePt2 = action.payload.arePt2;
      state.arePt3 = action.payload.arePt3;
      state.areaCode = action.payload.areaCode;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.nX = action.payload.nX;
      state.nY = action.payload.nY;
    },
  },
});

// 액션 생성자 내보내기
export const { updatePosition } = positionSlice.actions;

// 리듀서 내보내기
export default positionSlice.reducer;
