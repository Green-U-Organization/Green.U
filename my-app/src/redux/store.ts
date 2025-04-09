import { configureStore } from '@reduxjs/toolkit';
import gardenIdReducer from './garden/gardenIdSlice';

export const store = configureStore({
  reducer: {
    garden: gardenIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
