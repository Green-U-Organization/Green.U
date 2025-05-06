import { configureStore, isPlain } from '@reduxjs/toolkit';
import type { Action } from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction } from 'redux-thunk';
import { thunk } from 'redux-thunk';
import api from '@/slice/api';

import gardenReducer from './garden/gardenSlice';
import parcelReducer from './parcel/parcelSlice';
import lineReducer from './line/lineSlice';
import displayReducer from './display/displaySlice';
import authReducer from '../slice/authSlice';

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: Date) => value instanceof Date || isPlain(value);

export const store = configureStore({
  reducer: {
    garden: gardenReducer,
    parcel: parcelReducer,
    line: lineReducer,
    display: displayReducer,
    auth: authReducer,

    // API reducer
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { isSerializable } })
      .concat(thunk)
      .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
