import { configureStore } from '@reduxjs/toolkit';
import gardenReducer from './garden/gardenSlice';
import parcelReducer from './parcel/parcelSlice';
import lineReducer from './line/lineSlice';

export const store = configureStore({
  reducer: {
    garden: gardenReducer,
    parcel: parcelReducer,
    line: lineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
