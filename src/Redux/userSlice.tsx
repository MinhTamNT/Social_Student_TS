import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    currentUser: any;
    isFetching: boolean;
    error: boolean;
  };
  updateUser: {
    success: boolean;
    isFetching: boolean;
    error: boolean;
  };
  followerUser: {
    success: boolean;
    isFetching: boolean;
    error: boolean;
  };
}
const initialState: UserState = {
  user: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  updateUser: {
    success: false,
    isFetching: false,
    error: false,
  },
  followerUser: {
    success: false,
    isFetching: false,
    error: false,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.user.isFetching = true;
    },
    getUserSucess: (state, action: PayloadAction<any>) => {
      state.user.currentUser = action.payload;
      state.user.error = false;
    },
    getUserFail: (state) => {
      state.user.error = true;
    },
  },
});

export const { getUserFail, getUserStart, getUserSucess } = userSlice.actions;
export default userSlice.reducer;
