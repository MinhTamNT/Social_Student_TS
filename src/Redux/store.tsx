import {
  configureStore,
  combineReducers,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkAction } from "redux-thunk";
import { useDispatch } from "react-redux";
import storyReducer from "./storySlice";
export type RootState = ReturnType<typeof combinedReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user"],
};

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comments: commentReducer,
  story: storyReducer,
});

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === "auth/logoutSuccess") {
    state = undefined;
  }
  return combinedReducer(state, action as PayloadAction);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        isSerializable: () => true,
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
