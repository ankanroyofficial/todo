import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  refreshToken: string;
  loading: boolean;
  userDetails: null | any;
  isDarkTheme: boolean;
}

const initialState: AuthState = {
  refreshToken: '',
  token: '',
  loading: true,
  userDetails: null,
  isDarkTheme: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) {
      state.loading = false;
      state.token = action.payload?.token;
      state.refreshToken = action.payload?.refreshToken;
    },
    storeTheme(state, action: PayloadAction<boolean>) {
      state.isDarkTheme = action.payload;
    },
    storeUserData(state, action) {
      state.userDetails = action.payload;
    },
    resetAllData: () => initialState,
  },
});

export const { setToken, resetAllData, storeUserData, storeTheme } =
  authSlice.actions;
export default authSlice.reducer;
