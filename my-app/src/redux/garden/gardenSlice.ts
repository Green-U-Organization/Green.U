import { Crop, Garden, Line, Nursery, Parcel } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    // editParcelStore: (state, action: PayloadAction<Parcel>) => {},

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

    // editLineStore: (state, action: PayloadAction<Line>) => {},

    //Nurseries
    addPlantNurseryStore: (state, action: PayloadAction<Nursery>) => {
      if (state.selectedGarden) {
        console.log('slice : ', action.payload);
        state.selectedGarden.plantNurseries.push(action.payload);
      }
    },
    deleteNurseryStore: (state, action: PayloadAction<number>) => {
      if (state.selectedGarden) {
        state.selectedGarden.plantNurseries =
          state.selectedGarden.plantNurseries.filter(
            (p) => p.id !== action.payload
          );
      }
    },

    //Crops
    addCropLineStore: (state, action: PayloadAction<Crop>) => {
      if (state.selectedGarden) {
        state.selectedGarden.parcels.forEach((parcel) => {
          if (parcel.id === action.payload.parcelId && parcel.lines) {
            const line = parcel.lines.find(
              (l) => l.id === action.payload.lineId
            );
            if (line) {
              if (!line.crops) {
                line.crops = [];
              }
              line.crops.push(action.payload);
            }
          }
        });
      }
    },
    addCropNurseryStore: (state, action: PayloadAction<Crop>) => {
      if (state.selectedGarden) {
        state.selectedGarden.plantNurseries.forEach((nursery) => {
          if (nursery.id === action.payload.plantNurseryId) {
            if (!nursery.crops) {
              nursery.crops = [];
            }
            nursery.crops.push(action.payload);
          }
        });
      }
      console.log('end');
    },

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
  addLineStore,
  deleteLineStore,
  addCropLineStore,
  addCropNurseryStore,
  addPlantNurseryStore,
  deleteNurseryStore,
} = gardenSlice.actions;
export default gardenSlice.reducer;
