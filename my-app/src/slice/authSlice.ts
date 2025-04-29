import { createSlice } from '@reduxjs/toolkit';
import { setAuthCookies, clearAuthCookies } from '../utils/authCookies';

const initialState = {
  id: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.token = accessToken;

      // Stockage dans les cookies
      setAuthCookies(
        { accessToken, refreshToken },
        { username: user.username, id: user.id }
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      clearAuthCookies();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
