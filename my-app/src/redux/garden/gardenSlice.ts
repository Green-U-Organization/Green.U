import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import { Garden, Line, Parcel } from '@/utils/types';
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
    //Parcels
    addParcelStore: (state, action: PayloadAction<Parcel[]>) => {
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
    editParcelStore: (state, action: PayloadAction<Parcel>) => {},

    //Lines
    addLineStore: (state, action: PayloadAction<Line>) => {
      if (state.selectedGarden) {
        const parcel = state.selectedGarden.parcels.find(
          (p) => p.id === action.payload.parcelId
        );
        if (parcel) {
          if (!parcel.lines) {
            parcel.lines = [];
          }
          parcel.lines.push(action.payload);
        }
      }
    },
    deleteLineStore: (state, action: PayloadAction<number>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.forEach((parcel) => {
          if (parcel.lines) {
            parcel.lines = parcel.lines.filter(
              (line) => line.id !== action.payload
            );
          }
        });
      }
    },

    editLineStore: (state, action: PayloadAction<Line>) => {},

    //Nurseries

    //Crops

    //Garden
    setSelectedGarden: (state, action: PayloadAction<Garden>) => {
      state.selectedGarden = action.payload;
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
});

export const {
  setSelectedGarden,
  clearSelectedGarden,
  setScale,
  setFullscreen,
  setReload,
  setGraphicMode,
  addParcelStore,
  deleteParcelStore,
} = gardenSlice.actions;
export default gardenSlice.reducer;
