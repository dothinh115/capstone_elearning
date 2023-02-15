import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API, limitCategoriesCourses } from "../../util/config";
import {
  CategoriesStateType,
  CategoriesType,
} from "../../util/interface/categoriesReducerInterface";
import { CourseType } from "../../util/interface/courseReducerInterface";
import { DispatchType } from "../store";

const initialState: CategoriesStateType = {
  categories: [],
  limitCouses: limitCategoriesCourses,
  coursesByCategories: null,
  categoriesLoading: false,
};

const categoriesReducer = createSlice({
  name: "categoriesReducer",
  initialState,
  reducers: {
    getCategoriesAction: (
      state: CategoriesStateType,
      action: PayloadAction<CategoriesType[]>
    ) => {
      state.categories = action.payload;
    },

    setLimitCoursesAction: (
      state: CategoriesStateType,
      action: PayloadAction<number>
    ) => {
      state.limitCouses = action.payload;
    },
    getCoursesByCategoriesAction: (
      state: CategoriesStateType,
      action: PayloadAction<CourseType[] | null | undefined>
    ) => {
      state.coursesByCategories = action.payload;
    },
    setCategoriesLoadingAction: (
      state: CategoriesStateType,
      action: PayloadAction<boolean>
    ) => {
      state.categoriesLoading = action.payload;
    },
  },
});

export const {
  getCategoriesAction,
  setLimitCoursesAction,
  getCoursesByCategoriesAction,
  setCategoriesLoadingAction,
} = categoriesReducer.actions;

export default categoriesReducer.reducer;

/******* Async Action ******* */
export const getAllCategoriesApi = async (dispatch: DispatchType) => {
  try {
    const result = await API.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    const getCateAction: PayloadAction<CategoriesType[]> = getCategoriesAction(
      result.data
    );
    dispatch(getCateAction);
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesByCategoriesApi = (
  maDanhMuc: string[] | undefined | null
) => {
  let resultCoursesArr: CourseType[] | null = [];
  return async (dispatch: DispatchType) => {
    const loadingAction: PayloadAction<boolean> =
      setCategoriesLoadingAction(true);
    dispatch(loadingAction);
    try {
      if (maDanhMuc === null || maDanhMuc === undefined) maDanhMuc = [];
      for (let value of maDanhMuc) {
        const result = await API.get(
          `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${value}`
        );
        for (let courses of result.data) {
          resultCoursesArr = [...resultCoursesArr!, courses];
        }
      }
      if (resultCoursesArr!.length === 0) resultCoursesArr = null;
      const coursesByCategoriesAction: PayloadAction<
        CourseType[] | null | undefined
      > = getCoursesByCategoriesAction(resultCoursesArr!);
      dispatch(coursesByCategoriesAction);
    } catch (error) {
      console.log(error);
    } finally {
      const loadingAction: PayloadAction<boolean> =
        setCategoriesLoadingAction(false);
      dispatch(loadingAction);
    }
  };
};
