import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/features/slices/auth/authSlice";
import userReducer from "./redux/features/slices/user/userSlice";
import domainReducer from "./redux/features/slices/domain/domainSlice";
import globalReducer from "./redux/features/slices/global/globalSlice";
import { apiSlice } from "./redux/features/slices/api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    domain: domainReducer,
    global: globalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
