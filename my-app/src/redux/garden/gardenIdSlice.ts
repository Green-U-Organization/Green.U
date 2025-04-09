import { createSlice } from '@reduxjs/toolkit';

interface GardenId {
  value: number;
}

const initialState: GardenId = {
  value: 0,
};

const gardenIdSlice = createSlice({
  name: 'gardenId',
  initialState,
  reducers: {},
});

export default gardenIdSlice.reducer;
