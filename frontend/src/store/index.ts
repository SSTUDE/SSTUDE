import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {

  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;