import { createSlice } from "@reduxjs/toolkit";
import { API, numberRandomCourses } from "../../util/config";
import { DispatchType } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomArray, randomDiscount } from "../../util/function";
import {
  CourseStateType,
  CourseType,
  UpdateCourseType,
} from "../../util/interface/courseReducerInterface";
import { history } from "../../App";

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
    let arr: CourseType[] = [];
    for (let value of result.data) {
      value = {
        ...value,
        discount: randomDiscount(),
      };
      arr = [...arr, value];
    }
    const getAllCourses: PayloadAction<CourseType[]> = getAllCoursesAction(arr);
    dispatch(getAllCourses);
    const getRandomCourses: PayloadAction<CourseType[]> =
      getRandomCoursesAction(randomArray<CourseType>(arr, numberRandomCourses));
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
      let obj = {
        ...result.data,
        discount: randomDiscount(),
      };
      const updateCourseDetailAction: PayloadAction<CourseType> =
        getCourseDetailAction(obj);
      dispatch(updateCourseDetailAction);
    } catch (error) {
      console.log(error);
    } finally {
      const setLoading: PayloadAction<boolean> = setLoadingAction(false);
      dispatch(setLoading);
    }
  };
};

export const courseUpdateApi = (data: UpdateCourseType) => {
  return async (dispatch: DispatchType) => {
    try {
      await API.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data);
      dispatch(getAllCoursesApi);
      history.push(window.location.pathname, {
        successMess: "Cập nhật thành công!",
      });
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMess: error.response.data,
      });
    }
  };
};
