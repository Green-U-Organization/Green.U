import { Garden } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type mapState = {
  filteredMarker: { garden: Garden }[];
  radius: number;
};

const initialState: mapState = {
  filteredMarker: [],
  radius: 5,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setFilteredMarker: (state, action: PayloadAction<{ garden: Garden }[]>) => {
      state.filteredMarker = action.payload;
    },
    setRadiusStore: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
  },
});

export const { setFilteredMarker, setRadiusStore } = mapSlice.actions;
export default mapSlice.reducer;
