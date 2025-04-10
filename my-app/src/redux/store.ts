import { configureStore } from '@reduxjs/toolkit';
import gardenReducer from './garden/gardenSlice';
import parcelReducer from './parcel/parcelSlice';

export const store = configureStore({
  reducer: {
    garden: gardenReducer,
    parcel: parcelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
