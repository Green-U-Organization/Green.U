import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type displayState = {
  id: number;
  addCropNurseryPopup: boolean;
  addCropPopup: boolean;
  addCreenhousePopup: boolean;
  addNurseryPopup: boolean;
  addParcelPopup: boolean;
  existantCropPopup: boolean;
};

type payloadType = {
  state: boolean;
  id: number;
};

const initialState: displayState = {
  id: 0,
  addCropNurseryPopup: false,
  addCropPopup: false,
  addCreenhousePopup: false,
  addNurseryPopup: false,
  addParcelPopup: false,
  existantCropPopup: false,
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setAddCropNurseryPopup: (state, action: PayloadAction<payloadType>) => {
      state.addCropNurseryPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setAddCropPopup: (state, action: PayloadAction<payloadType>) => {
      state.addCropPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setAddGreenhousePopup: (state, action: PayloadAction<payloadType>) => {
      state.addCreenhousePopup = action.payload.state;
      state.id = action.payload.id;
    },
    setAddNurseryPopup: (state, action: PayloadAction<payloadType>) => {
      state.addNurseryPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setAddParcelPopup: (state, action: PayloadAction<payloadType>) => {
      state.addParcelPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setExistantCropPopup: (state, action: PayloadAction<payloadType>) => {
      state.existantCropPopup = action.payload.state;
      state.id = action.payload.id;
    },
  },
});

export const {
  setAddCropNurseryPopup,
  setAddCropPopup,
  setAddGreenhousePopup,
  setAddNurseryPopup,
  setAddParcelPopup,
  setExistantCropPopup,
} = displaySlice.actions;
export default displaySlice.reducer;
