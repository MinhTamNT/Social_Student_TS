import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  login: {
    access_token(access_token: any): unknown;
    currentUser: any;
    isFetching: boolean;
    error: boolean;
  };
  register: {
    success: boolean;
    isFetching: boolean;
    error: boolean;
  };
  logout: {
    currentUser: null;
    isFetching: false;
    error: false;
  };
}

const initialState: AuthState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    success: false,
    isFetching: false,
    error: false,
  },
  logout: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
      state.login.error = false;
    },
    loginSucces: (state, action: PayloadAction<any>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFail: (state) => {
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.error = false;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFail: (state) => {
      state.register.error = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;
    },
  },
});

export const {
  loginFail,
  loginStart,
  loginSucces,
  registerFail,
  registerSuccess,
  registerStart,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
