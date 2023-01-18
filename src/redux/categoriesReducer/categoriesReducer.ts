import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  API,
  CategoriesStateType,
  CategoriesType,
  limitCategoriesCourses,
} from "../../util/config";
import { DispatchType } from "../store";

const initialState: CategoriesStateType = {
  categories: [],
  checkedCategories: null,
  limitCouses: limitCategoriesCourses,
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
    setCheckCategories: (
      state: CategoriesStateType,
      action: PayloadAction<string[] | null>
    ) => {
      state.checkedCategories = action.payload;
    },
    setLimitCourses: (
      state: CategoriesStateType,
      action: PayloadAction<number>
    ) => {
      state.limitCouses = action.payload;
    },
  },
});

export const { getCategoriesAction, setCheckCategories, setLimitCourses } =
  categoriesReducer.actions;

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
