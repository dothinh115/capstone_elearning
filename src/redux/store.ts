import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesReducer/categoriesReducer";
import courseReducer from "./courseReducer/courseReducer";
import userReducer from "./userReducer/userReducer";

export const store = configureStore({
  reducer: {
    courseReducer,
    categoriesReducer,
    userReducer,
  },
});

export type ReduxRootType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
