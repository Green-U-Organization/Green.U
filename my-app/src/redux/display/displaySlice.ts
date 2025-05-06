import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type displayState = {
  id: number;
  addCropNurseryPopup: boolean;
  addCropPopup: boolean;
  addGreenhousePopup: boolean;
  addNurseryPopup: boolean;
  addParcelPopup: boolean;
  existantCropPopup: boolean;
  editParcelPopup: boolean;
  editGardenPopup: boolean;
  editLinePopup: boolean;
};

type payloadType = {
  state: boolean;
  id: number;
};

const initialState: displayState = {
  id: 0,
  addCropNurseryPopup: false,
  addCropPopup: false,
  addGreenhousePopup: false,
  addNurseryPopup: false,
  addParcelPopup: false,
  existantCropPopup: false,
  editParcelPopup: false,
  editGardenPopup: false,
  editLinePopup: false,
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
      state.addGreenhousePopup = action.payload.state;
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
    setEditParcelPopup: (state, action: PayloadAction<payloadType>) => {
      state.editParcelPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setEditGardenPopup: (state, action: PayloadAction<payloadType>) => {
      state.editGardenPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setEditLinePopup: (state, action: PayloadAction<payloadType>) => {
      state.editLinePopup = action.payload.state;
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
  setEditGardenPopup,
  setEditLinePopup,
  setEditParcelPopup,
} = displaySlice.actions;
export default displaySlice.reducer;
