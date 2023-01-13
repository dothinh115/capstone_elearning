import { createSlice } from "@reduxjs/toolkit";
import { API, courseStateType, courseType } from "../../util/config";
import { DispatchType } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    getAllCoursesAction: (
      state: courseStateType,
      action: PayloadAction<courseType[]>
    ) => {
      state.courses = action.payload;
    },
  },
});

export const { getAllCoursesAction } = courseReducer.actions;

export default courseReducer.reducer;

/********** Async Action ********/
export const getAllCoursesApi = async (dispatch: DispatchType) => {
  try {
    const result = await API.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
    const action: PayloadAction<courseType[]> = getAllCoursesAction(
      result.data
    );
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
