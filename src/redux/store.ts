import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesReducer/categoriesReducer";
import courseReducer from "./courseReducer/courseReducer";
import pageReducer from "./pageReducer/pageReducer";
import profileReducer from "./profileReducer/profileReducer";
import userReducer from "./userReducer/userReducer";

export const store = configureStore({
  reducer: {
    courseReducer,
    categoriesReducer,
    userReducer,
    pageReducer,
    profileReducer,
  },
});

export type ReduxRootType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
