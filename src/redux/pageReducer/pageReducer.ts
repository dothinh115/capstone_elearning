import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevPage: "/",
};

const pageReducer = createSlice({
  name: "pageReducer",
  initialState,
  reducers: {
    updatePrevPageRecuder: (state, action) => {
      state.prevPage = action.payload;
    },
  },
});

export const { updatePrevPageRecuder } = pageReducer.actions;

export default pageReducer.reducer;
