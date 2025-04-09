import { getAllParcelByGardenId } from '@/utils/actions/garden/parcel/getAllParcelByGardenId';
import { Parcel } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParcelState {
  parcels: Parcel[];
  loading: boolean;
  error: string | null;
}

const initialState: ParcelState = {
  parcels: [],
  loading: false,
  error: null,
};

export const getParcelByGardenIdFct = createAsyncThunk(
  'parcel/getParcelByGardenId',
  async (gardenId: number, { rejectWithValue }) => {
    try {
      const parcels = await getAllParcelByGardenId(gardenId);
      return parcels;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const parcelSlice = createSlice({
  name: 'parcelList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getParcelByGardenIdFct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getParcelByGardenIdFct.fulfilled,
        (state, action: PayloadAction<Parcel[]>) => {
          state.loading = false;
          state.parcels = action.payload;
        }
      )
      .addCase(getParcelByGardenIdFct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default parcelSlice.reducer;
