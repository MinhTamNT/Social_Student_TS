import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

type AuthState = ReturnType<typeof authReducer>;
type UserState = ReturnType<typeof userReducer>;

export interface RootState {
  auth: AuthState;
  user: UserState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
