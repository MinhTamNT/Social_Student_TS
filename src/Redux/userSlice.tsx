import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    currentUser: any;
    isFetching: boolean;
    error: boolean;
  };
  followUser: {
    currentUser: any;
    pending: boolean;
    error: boolean;
  };
  loadingPage: boolean;
}

const initialState: UserState = {
  user: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  followUser: {
    currentUser: null,
    pending: false,
    error: false,
  },
  loadingPage: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.user.isFetching = true;
      state.loadingPage = true;
    },
    getUserSucess: (state, action: PayloadAction<any>) => {
      state.user.currentUser = action.payload;
      state.user.error = false;
      state.loadingPage = false;
    },
    getUserFail: (state) => {
      state.user.error = true;
      state.loadingPage = false;
    },
    updateStart: (state) => {
      state.user.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.error = false;
      state.user.currentUser = action.payload;
    },
    updateError: (state) => {
      state.user.error = false;
      state.user.isFetching = false;
    },
    deletedFollowUser: (state) => {
      state.followUser.pending = false;
    },
    deletedfollowUserSuccess: (state, action) => {
      state.followUser.currentUser = action.payload;
      state.followUser.pending = false;
    },
    deletedfollowUserFailed: (state) => {
      state.followUser.pending = false;
      state.followUser.error = false;
    },
  },
});

export const {
  getUserFail,
  getUserStart,
  getUserSucess,
  updateError,
  updateSuccess,
  updateStart,
  deletedFollowUser,
  deletedfollowUserFailed,
  deletedfollowUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
