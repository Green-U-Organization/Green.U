import { User } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

const gardenSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    setXpUser: (state, action: PayloadAction<number>) => {
      if (state.userData) {
        console.log('xp : ', state.userData.xp);
        state.userData.xp = action.payload;
      }
    },
  },
});

export const { setXpUser, setUserData } = gardenSlice.actions;
export default gardenSlice.reducer;
