import { api1 } from "./api";
import { api2 } from "./api";
import authSlice from "./slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api1.reducerPath]: api1.reducer,
    [api2.reducerPath]: api2.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api1.middleware, api2.middleware),
});
