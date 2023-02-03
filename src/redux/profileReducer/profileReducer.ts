import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { limitProfileCoursesView } from "../../util/config";

interface ProfileReducerType {
  coursesManageScroll: number | undefined;
  coursesViewNumber: number;
  registeredCoursesScroll: number | undefined;
  registeredCoursesViewNumber: number;
}

const initialState: ProfileReducerType = {
  coursesManageScroll: 0,
  coursesViewNumber: limitProfileCoursesView,
  registeredCoursesScroll: 0,
  registeredCoursesViewNumber: limitProfileCoursesView,
};

const profileReducer = createSlice({
  name: "profileReducer",
  initialState,
  reducers: {
    setCoursesManageScroll: (
      state: ProfileReducerType,
      action: PayloadAction<number | undefined>
    ) => {
      state.coursesManageScroll = action.payload;
    },
    setCoursesViewNumber: (
      state: ProfileReducerType,
      action: PayloadAction<number>
    ) => {
      state.coursesViewNumber = action.payload;
    },
    setRegisteredCoursesScroll: (
      state: ProfileReducerType,
      action: PayloadAction<number>
    ) => {
      state.registeredCoursesScroll = action.payload;
    },
    setRegisteredCoursesViewNumber: (
      state: ProfileReducerType,
      action: PayloadAction<number>
    ) => {
      state.registeredCoursesViewNumber = action.payload;
    },
  },
});

export const {
  setCoursesManageScroll,
  setCoursesViewNumber,
  setRegisteredCoursesScroll,
  setRegisteredCoursesViewNumber,
} = profileReducer.actions;

export default profileReducer.reducer;
