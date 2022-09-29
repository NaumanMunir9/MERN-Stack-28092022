// libraries
import { configureStore } from "@reduxjs/toolkit";
// features
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
