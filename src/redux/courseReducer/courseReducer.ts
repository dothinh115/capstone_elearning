import { createSlice } from "@reduxjs/toolkit";
import { API, numberRandomCourses } from "../../util/config";
import { DispatchType } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomArray, randomDiscount } from "../../util/function";
import {
  CourseStateType,
  CourseType,
  KhoaHocXetDuyetInterface,
} from "../../util/interface/courseReducerInterface";
import {
  DanhSachGhiDanh,
  dataGhiDanh,
} from "../../util/interface/userReducerInterface";
import {
  updateErrorMessageReducer,
  updateGlobalMessageReducer,
  updateSuccessMessageReducer,
} from "../pageReducer/pageReducer";
const initialState: CourseStateType = {
  coursesArr: null,
  randomCoursesArr: undefined,
  loading: false,
  courseDetail: null,
  hocVienChoXetDuyet: null,
  hocVienDaXetDuyet: null,
  khoaHocChoXetDuyet: null,
  khoaHocDaXetDuyet: null,
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
    layHocVienChoXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<DanhSachGhiDanh[] | null>
    ) => {
      state.hocVienChoXetDuyet = action.payload;
    },
    layHocVienDaXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<DanhSachGhiDanh[] | null>
    ) => {
      state.hocVienDaXetDuyet = action.payload;
    },
    layKhoaHocChoXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<KhoaHocXetDuyetInterface[] | null>
    ) => {
      state.khoaHocChoXetDuyet = action.payload;
    },
    layKhoaHocDaXetDuyetAction: (
      state: CourseStateType,
      action: PayloadAction<KhoaHocXetDuyetInterface[] | null>
    ) => {
      state.khoaHocDaXetDuyet = action.payload;
    },
  },
});

export const {
  getAllCoursesAction,
  getRandomCoursesAction,
  setLoadingAction,
  getCourseDetailAction,
  layHocVienChoXetDuyetAction,
  layHocVienDaXetDuyetAction,
  layKhoaHocChoXetDuyetAction,
  layKhoaHocDaXetDuyetAction,
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

export const courseUpdateApi = (data: any, withImg: boolean) => {
  return async (dispatch: DispatchType) => {
    try {
      withImg
        ? await API.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", data)
        : await API.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data);
      await dispatch(getAllCoursesApi);
      dispatch(updateSuccessMessageReducer("Update thành công!"));
    } catch (error: any) {
      console.log(error);
      dispatch(updateErrorMessageReducer(error.response.data));
    }
  };
};

export const createNewCourse = (data: any) => {
  let preview = {};
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.post(
        "QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        data
      );
      dispatch(getAllCoursesApi);
      dispatch(updateSuccessMessageReducer("Tạo khóa học thành công!"));
      preview = result.data;
      return preview;
    } catch (error: any) {
      console.log(error);
      dispatch(updateErrorMessageReducer(error.response.data));
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
      return result.data;
    } catch (error: any) {
      console.log(error);
      dispatch(updateGlobalMessageReducer(error.reponese?.data));
    }
  };
};

export const xetDuyetHocVienApi = (data: dataGhiDanh) => {
  return async () => {
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
      dispatch(layHocVienChoXetDuyetAction(data));
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
      dispatch(layHocVienDaXetDuyetAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDsKhoaHocChoGhiDanh = (userID: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.post(
        "/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        {
          taiKhoan: userID,
        }
      );
      let action: PayloadAction<KhoaHocXetDuyetInterface[] | null> =
        layKhoaHocChoXetDuyetAction(
          result.data.length === 0 ? null : result.data
        );

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDsKhoaHocDaGhiDanh = (userID: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.post(
        "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        {
          taiKhoan: userID,
        }
      );
      let action: PayloadAction<KhoaHocXetDuyetInterface[] | null> =
        layKhoaHocDaXetDuyetAction(
          result.data.length === 0 ? null : result.data
        );

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
