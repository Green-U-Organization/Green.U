import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import { Garden, Parcel } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GardenState {
  gardens: Garden[];
  selectedGarden: Garden | null;
  loading: boolean;
  error: string | null;
  scale: number;
  fullscreen: boolean;
  reload: boolean;
  graphicMode: boolean;
}

const initialState: GardenState = {
  gardens: [],
  selectedGarden: null,
  loading: false,
  error: null,
  scale: 10,
  fullscreen: false,
  reload: false,
  graphicMode: false,
};

// export const getGardenByUserIdFct = createAsyncThunk(
//   'garden/getGardenByUserId',
//   async (userId: number, { rejectWithValue }) => {
//     try {
//       const gardens = await getAllGardenByUserId(userId);
//       return gardens;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );

const gardenSlice = createSlice({
  name: 'garden',
  initialState,
  reducers: {
    setSelectedGarden: (state, action: PayloadAction<Garden>) => {
      state.selectedGarden = action.payload;
    },
    addParcel: (state, action: PayloadAction<Parcel[]>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.push(...action.payload);
      }
    },
    deleteParcelStore: (state, action: PayloadAction<number>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels = state.selectedGarden.parcels.filter(
          (p) => p.id !== action.payload
        );
      }
    },
    clearSelectedGarden: (state) => {
      state.selectedGarden = null;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.fullscreen = action.payload;
    },
    setReload: (state) => {
      state.reload = !state.reload;
    },
    setGraphicMode: (state) => {
      state.graphicMode = !state.graphicMode;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getGardenByUserIdFct.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       getGardenByUserIdFct.fulfilled,
  //       (state, action: PayloadAction<Garden[]>) => {
  //         state.loading = false;
  //         state.gardens = action.payload;
  //       }
  //     )
  //     .addCase(getGardenByUserIdFct.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload as string;
  //     });
  // },
});

export const {
  setSelectedGarden,
  clearSelectedGarden,
  setScale,
  setFullscreen,
  setReload,
  setGraphicMode,
  addParcel,
  deleteParcelStore,
} = gardenSlice.actions;
export default gardenSlice.reducer;
