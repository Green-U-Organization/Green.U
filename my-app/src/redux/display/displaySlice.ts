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
  displayGardenLogPopup: boolean;
  displayParcelLogPopup: boolean;
  displayLineLogPopup: boolean;
  displayCropLogPopup: boolean;
  displayNurseryLogPopup: boolean;
  displayGreenhouseLogPopup: boolean;
};

type payloadType = {
  state: boolean;
  id?: number;
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
  displayGardenLogPopup: false,
  displayParcelLogPopup: false,
  displayLineLogPopup: false,
  displayCropLogPopup: false,
  displayNurseryLogPopup: false,
  displayGreenhouseLogPopup: false,
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
    setDisplayGardenLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayGardenLogPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setDisplayParcelLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayParcelLogPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setDisplayLineLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayLineLogPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setDisplayCropLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayCropLogPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setDisplayNurseryLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayNurseryLogPopup = action.payload.state;
      state.id = action.payload.id;
    },
    setDisplayGreenhouseLogPopup: (
      state,
      action: PayloadAction<payloadType>
    ) => {
      state.displayGreenhouseLogPopup = action.payload.state;
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
  setDisplayCropLogPopup,
  setDisplayGardenLogPopup,
  setDisplayGreenhouseLogPopup,
  setDisplayLineLogPopup,
  setDisplayNurseryLogPopup,
  setDisplayParcelLogPopup,
} = displaySlice.actions;
export default displaySlice.reducer;
