import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./redux/features/slices/auth/authSlice";
import userReducer from "./redux/features/slices/user/userSlice";
import domainReducer from "./redux/features/slices/domain/domainSlice";
import globalReducer from "./redux/features/slices/global/globalSlice";
import { apiSlice } from "./redux/features/slices/api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  domain: domainReducer,
  global: globalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
