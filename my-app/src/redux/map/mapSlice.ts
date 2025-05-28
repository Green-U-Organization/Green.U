import { Garden } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type mapState = {
  filteredMarker: { garden: Garden }[];
};

const initialState: mapState = {
  filteredMarker: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setFilteredMarker: (state, action: PayloadAction<{ garden: Garden }[]>) => {
      state.filteredMarker = action.payload;
    },
  },
});

export const { setFilteredMarker } = mapSlice.actions;
export default mapSlice.reducer;
