import { getAllLinesByParcelId } from '@/utils/actions/garden/parcel/line/getAllLinesByParcelId';
import { Line } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LineState {
  lines: Line[];
  loading: boolean;
  error: string | null;
}

const initialState: LineState = {
  lines: [],
  loading: false,
  error: null,
};

export const getLinesByParcelIdFct = createAsyncThunk(
  'line/getLineByUserId',
  async (parcelId: number, { rejectWithValue }) => {
    try {
      const lines = await getAllLinesByParcelId(parcelId);
      return lines;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const lineSlice = createSlice({
  name: 'lineList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLinesByParcelIdFct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getLinesByParcelIdFct.fulfilled,
        (state, action: PayloadAction<Line[]>) => {
          state.loading = false;
          state.lines = action.payload;
        }
      )
      .addCase(getLinesByParcelIdFct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lineSlice.reducer;
