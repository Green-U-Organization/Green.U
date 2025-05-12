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
      state.id = action.payload.id ?? 0;
    },
    setAddCropPopup: (state, action: PayloadAction<payloadType>) => {
      state.addCropPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setAddGreenhousePopup: (state, action: PayloadAction<payloadType>) => {
      state.addGreenhousePopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setAddNurseryPopup: (state, action: PayloadAction<payloadType>) => {
      state.addNurseryPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setAddParcelPopup: (state, action: PayloadAction<payloadType>) => {
      state.addParcelPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setExistantCropPopup: (state, action: PayloadAction<payloadType>) => {
      state.existantCropPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setEditParcelPopup: (state, action: PayloadAction<payloadType>) => {
      state.editParcelPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setEditGardenPopup: (state, action: PayloadAction<payloadType>) => {
      state.editGardenPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setEditLinePopup: (state, action: PayloadAction<payloadType>) => {
      state.editLinePopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayGardenLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayGardenLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayParcelLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayParcelLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayLineLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayLineLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayCropLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayCropLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayNurseryLogPopup: (state, action: PayloadAction<payloadType>) => {
      state.displayNurseryLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
    },
    setDisplayGreenhouseLogPopup: (
      state,
      action: PayloadAction<payloadType>
    ) => {
      state.displayGreenhouseLogPopup = action.payload.state;
      state.id = action.payload.id ?? 0;
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
