import { createSlice } from "@reduxjs/toolkit";
import {
  API,
  CourseStateType,
  CourseType,
  numberRandomCourses,
} from "../../util/config";
import { DispatchType } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomArray } from "../../util/function";

const initialState: CourseStateType = {
  coursesArr: [],
  randomCoursesArr: [],
  loading: false,
  courseDetail: null,
};

const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    getAllCoursesAction: (
      state: CourseStateType,
      action: PayloadAction<CourseType[]>
    ) => {
      state.coursesArr = action.payload;
    },
    getRandomCoursesAction: (
      state: CourseStateType,
      action: PayloadAction<CourseType[]>
    ) => {
      state.randomCoursesArr = action.payload;
    },
    setLoadingAction: (
      state: CourseStateType,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    getCourseDetailAction: (
      state: CourseStateType,
      action: PayloadAction<CourseType>
    ) => {
      state.courseDetail = action.payload;
    },
  },
});

export const {
  getAllCoursesAction,
  getRandomCoursesAction,
  setLoadingAction,
  getCourseDetailAction,
} = courseReducer.actions;

export default courseReducer.reducer;

/********** Async Action ********/
export const getAllCoursesApi = async (dispatch: DispatchType) => {
  const setLoading: PayloadAction<boolean> = setLoadingAction(true);
  dispatch(setLoading);
  try {
    const result = await API.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
    const getAllCourses: PayloadAction<CourseType[]> = getAllCoursesAction(
      result.data
    );
    dispatch(getAllCourses);
    const getRandomCourses: PayloadAction<CourseType[]> =
      getRandomCoursesAction(
        randomArray<CourseType>(result.data, numberRandomCourses)
      );
    dispatch(getRandomCourses);
  } catch (error) {
    console.log(error);
  } finally {
    const setLoading: PayloadAction<boolean> = setLoadingAction(false);
    dispatch(setLoading);
  }
};

export const getCourseDetailApi = (maKhoaHoc: string | undefined) => {
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      const result = await API.get(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
      );
      const updateCourseDetailAction: PayloadAction<CourseType> =
        getCourseDetailAction(result.data);
      dispatch(updateCourseDetailAction);
    } catch (error) {
      console.log(error);
    } finally {
      const setLoading: PayloadAction<boolean> = setLoadingAction(false);
      dispatch(setLoading);
    }
  };
};
