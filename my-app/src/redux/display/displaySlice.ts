import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type displayState = {
  id: number;
  addCropNurseryPopup: boolean;
  addCropPopup: boolean;
  addCreenhousePopup: boolean;
  addNurseryPopup: boolean;
  addParcelPopup: boolean;
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
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setAddCropNurseryPopup: (state, action: PayloadAction<payloadType>) => {
      state.addCropNurseryPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setAddCropPopup: (state, action: PayloadAction<boolean>) => {
      state.addCropPopup = action.payload;
    },
    setAddGreenhousePopup: (state, action: PayloadAction<boolean>) => {
      state.addCreenhousePopup = action.payload;
    },
    setAddNurseryPopup: (state, action: PayloadAction<boolean>) => {
      state.addNurseryPopup = action.payload;
    },
    setAddParcelPopup: (state, action: PayloadAction<boolean>) => {
      state.addParcelPopup = action.payload;
    },
  },
});

export const {
  setAddCropNurseryPopup,
  setAddCropPopup,
  setAddGreenhousePopup,
  setAddNurseryPopup,
  setAddParcelPopup,
} = displaySlice.actions;
export default displaySlice.reducer;
