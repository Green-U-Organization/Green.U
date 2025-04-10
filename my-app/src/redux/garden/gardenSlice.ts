import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import { Garden } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GardenState {
  gardens: Garden[];
  selectedGarden: Garden | null;
  loading: boolean;
  error: string | null;
}

const initialState: GardenState = {
  gardens: [],
  selectedGarden: null,
  loading: false,
  error: null,
};

export const getGardenByUserIdFct = createAsyncThunk(
  'garden/getGardenByUserId',
  async (userId: number, { rejectWithValue }) => {
    try {
      const gardens = await getAllGardenByUserId(userId);
      return gardens;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const gardenSlice = createSlice({
  name: 'garden',
  initialState,
  reducers: {
    setSelectedGarden: (state, action: PayloadAction<Garden>) => {
      state.selectedGarden = action.payload;
    },
    clearSelectedGarden: (state) => {
      state.selectedGarden = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGardenByUserIdFct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getGardenByUserIdFct.fulfilled,
        (state, action: PayloadAction<Garden[]>) => {
          state.loading = false;
          state.gardens = action.payload;
        }
      )
      .addCase(getGardenByUserIdFct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedGarden, clearSelectedGarden } = gardenSlice.actions;
export default gardenSlice.reducer;
