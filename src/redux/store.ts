import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseReducer/courseReducer";

export const store = configureStore({
    reducer: {
        courseReducer
    }
});

export type ReduxRootType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;