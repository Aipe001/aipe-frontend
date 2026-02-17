import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  mobile: string; // Mapped from phone in API
  email?: string | null;
  status?: string;
  // Legacy fields (optional for now)
  address?: string;
  profession?: string;
  description?: string;
  profilePhoto?: string;
  govtId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  tempIdentifier: string | null; // To store mobile between steps
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
  tempIdentifier: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTempIdentifier: (state, action: PayloadAction<string>) => {
      state.tempIdentifier = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSentSuccess: (state) => {
      state.loading = false;
      state.otpSent = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.otpSent = false;
      state.error = null;
      state.tempIdentifier = null;
      // Save token and user to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
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
  setTempIdentifier,
  loginStart,
  otpSentSuccess,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
