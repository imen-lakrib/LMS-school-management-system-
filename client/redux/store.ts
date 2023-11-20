"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false, // for not allow users debug using redux console
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the refreshToken function on every page load

const initializeApp = async () => {
  // await store.dispatch(
  //   apiSlice.endpoints.refreshToken.initiate({ forceRefresh: true })
  // );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({ forceRefresh: true })
  );
};

initializeApp();
