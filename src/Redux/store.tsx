import {
  configureStore,
  combineReducers,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
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
      },
    }),
});

export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
