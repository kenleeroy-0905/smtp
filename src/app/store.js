import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/features/slices/auth/authSlice";
import userReducer from "./redux/features/slices/user/userSlice";
import domainReducer from "./redux/features/slices/domain/domainSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    domain: domainReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
