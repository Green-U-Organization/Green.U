import { getAllLinesByParcelId } from '@/utils/actions/garden/parcel/line/getAllLinesByParcelId';
import { Line } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LineState {
  linesByParcelId: Record<number, Line[]>;
  loading: boolean;
  error: string | null;
}

const initialState: LineState = {
  linesByParcelId: {},
  loading: false,
  error: null,
};

export const getLinesByParcelIdFct = createAsyncThunk(
  'line/getLineByUserId',
  async (parcelId: number, { rejectWithValue }) => {
    try {
      const lines = await getAllLinesByParcelId(parcelId);
      return { parcelId, lines };
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
        (state, action: PayloadAction<{ parcelId: number; lines: Line[] }>) => {
          state.loading = false;
          state.linesByParcelId[action.payload.parcelId] = action.payload.lines;
        }
      )
      .addCase(getLinesByParcelIdFct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lineSlice.reducer;
