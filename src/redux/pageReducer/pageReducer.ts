import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageReducerType {
  prevPage?: string;
  successMessage?: string | null;
  errorMessage?: string | null;
  addResult?: string | null;
  deleteResult?: string | null;
  toggleModalClick?: boolean;
  globalMessage?: string | null;
}

const initialState: PageReducerType = {
  prevPage: "/",
  successMessage: null,
  errorMessage: null,
  addResult: null,
  deleteResult: null,
  toggleModalClick: false,
  globalMessage: null,
};

const pageReducer = createSlice({
  name: "pageReducer",
  initialState,
  reducers: {
    updatePrevPageRecuder: (
      state: PageReducerType,
      action: PayloadAction<string>
    ) => {
      state.prevPage = action.payload;
    },
    updateSuccessMessageReducer: (
      state: PageReducerType,
      action: PayloadAction<string | null>
    ) => {
      state.successMessage = action.payload;
    },
    updateErrorMessageReducer: (
      state: PageReducerType,
      action: PayloadAction<string | null>
    ) => {
      state.errorMessage = action.payload;
    },
    updateAddResultReducer: (
      state: PageReducerType,
      action: PayloadAction<string | null>
    ) => {
      state.addResult = action.payload;
    },
    updateDeleteResultReducer: (
      state: PageReducerType,
      action: PayloadAction<string | null>
    ) => {
      state.deleteResult = action.payload;
    },
    updateToggleModalReducer: (
      state: PageReducerType,
      action: PayloadAction<boolean>
    ) => {
      state.toggleModalClick = action.payload;
    },
    updateGlobalMessageReducer: (
      state: PageReducerType,
      action: PayloadAction<string | null>
    ) => {
      state.globalMessage = action.payload;
    },
  },
});

export const {
  updatePrevPageRecuder,
  updateSuccessMessageReducer,
  updateErrorMessageReducer,
  updateAddResultReducer,
  updateDeleteResultReducer,
  updateToggleModalReducer,
  updateGlobalMessageReducer,
} = pageReducer.actions;

export default pageReducer.reducer;
