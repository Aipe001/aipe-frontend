import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  profession?: string;
  description?: string;
  profilePhoto?: string;
  govtId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSentSuccess: (state) => {
      state.loading = false;
      state.otpSent = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.otpSent = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.otpSent = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
      state.otpSent = false;
    },
  },
});

export const {
  loginStart,
  otpSentSuccess,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
