import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import { Garden, GardenFull, Parcel, Nursery, Line, Crop } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GardenState {
  gardens: Garden[];
  selectedGarden: GardenFull | null;
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
    setSelectedGarden: (state, action: PayloadAction<GardenFull>) => {
      state.selectedGarden = action.payload;
    },
    clearSelectedGarden: (state) => {
      state.selectedGarden = null;
    },
    addParcel: (state, action: PayloadAction<Parcel>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.push(action.payload);
      }
    },
    addNursery: (state, action: PayloadAction<Nursery>) => {
      if (state.selectedGarden) {
        state.selectedGarden.nursery.push(action.payload);
      }
    },
    addLine: (state, action: PayloadAction<Line>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.forEach((parcel) => {
          if (!parcel.lines) {
            parcel.lines = [];
          }
          parcel.lines.push(action.payload);
        });
      }
    },
    addCropInLine: (state, action: PayloadAction<Crop>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.forEach((parcel) => {
          if (!parcel.lines) {
            parcel.lines = [];
          }
          parcel.lines.forEach((line) => {
            if (!line.crop) {
              line.crop = [];
            }
            line.crop.push(action.payload);
          });
        });
      }
    },

    deleteParcel: (state, action: PayloadAction<{ parcelId: number }>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels = state.selectedGarden.parcels.filter(
          (parcel) => parcel.id !== action.payload.parcelId
        );
      }
    },
    deleteNursery: (state, action: PayloadAction<{ nurseryId: number }>) => {
      if (state.selectedGarden) {
        state.selectedGarden.nursery = state.selectedGarden.nursery.filter(
          (nursery) => nursery.id !== action.payload.nurseryId
        );
      }
    },
    deleteLine: (
      state,
      action: PayloadAction<{ parcelId: number; lineId: number }>
    ) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.forEach((parcel) => {
          if (parcel.id === action.payload.parcelId) {
            parcel.lines = parcel.lines?.filter(
              (line) => line.id !== action.payload.lineId
            );
          }
        });
      }
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

export const {
  setSelectedGarden,
  clearSelectedGarden,
  setScale,
  setFullscreen,
  setReload,
  setGraphicMode,
  addNursery,
  addLine,
  addCropInLine,
  addParcel,
  deleteLine,
  deleteNursery,
  deleteParcel,
} = gardenSlice.actions;
export default gardenSlice.reducer;
