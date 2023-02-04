import { createSlice } from "@reduxjs/toolkit";
import { API, ApiResultType, numberRandomCourses } from "../../util/config";
import { DispatchType } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomArray, randomDiscount } from "../../util/function";
import {
  CourseStateType,
  CourseType,
  UpdateCourseType,
} from "../../util/interface/courseReducerInterface";
import { history } from "../../App";
import {
  DanhSachGhiDanh,
  dataGhiDanh,
} from "../../util/interface/userReducerInterface";
import {
  PageReducerType,
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../pageReducer/pageReducer";
const initialState: CourseStateType = {
  coursesArr: [],
  randomCoursesArr: [],
  loading: false,
  courseDetail: null,
  choXetDuyet: null,
  daXetDuyet: null,
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
      action: PayloadAction<CourseType | null>
    ) => {
      state.courseDetail = action.payload;
    },
    layDSChoXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<DanhSachGhiDanh[] | null>
    ) => {
      state.choXetDuyet = action.payload;
    },
    layDSDaXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<DanhSachGhiDanh[] | null>
    ) => {
      state.daXetDuyet = action.payload;
    },
  },
});

export const {
  getAllCoursesAction,
  getRandomCoursesAction,
  setLoadingAction,
  getCourseDetailAction,
  layDSChoXetDuyetAction,
  layDSDaXetDuyetAction,
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
      const updateCourseDetailAction: PayloadAction<CourseType | null> =
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
      dispatch(updateSuccessMessageReducer("Update thành công!"));
    } catch (error: any) {
      console.log(error);
      dispatch(updateErrorMessageReducer(error.response.data));
    }
  };
};

export const createNewCourse = (data: UpdateCourseType) => {
  return async (dispatch: DispatchType) => {
    try {
      await API.post("/QuanLyKhoaHoc/ThemKhoaHoc", data);
      dispatch(getAllCoursesApi);
      history.push(`/course/${data.maKhoaHoc}`);
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMess: error.response.data,
      });
    }
  };
};

export const courseDeleteApi = (maKhoaHoc: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.delete(
        `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`
      );
      await dispatch(getAllCoursesApi);
      history.push(window.location.pathname + window.location.search, {
        deleteSuccess: result.data,
      });
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname + window.location.search, {
        deleteError: error.reponese?.data,
      });
    }
  };
};

export const xetDuyetHocVienApi = (data: dataGhiDanh) => {
  return async (dispatch: DispatchType) => {
    try {
      await API.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDSChoXetDuyetApi = (maKhoaHoc: string | undefined) => {
  let data: DanhSachGhiDanh[] | null = null;
  return async (dispatch: DispatchType) => {
    try {
      const danhSachChoXetDuyet = await API.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        {
          maKhoaHoc,
        }
      );
      if (danhSachChoXetDuyet.data.length !== 0)
        data = danhSachChoXetDuyet.data;
      dispatch(layDSChoXetDuyetAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDSDaXetDuyetApi = (maKhoaHoc: string | undefined) => {
  let data: DanhSachGhiDanh[] | null = null;
  return async (dispatch: DispatchType) => {
    try {
      const danhSachDaXetDuyet = await API.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        {
          maKhoaHoc,
        }
      );
      if (danhSachDaXetDuyet.data.length !== 0) data = danhSachDaXetDuyet.data;
      dispatch(layDSDaXetDuyetAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};
