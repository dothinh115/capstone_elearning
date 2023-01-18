import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API, CategoriesStateType, CategoriesType } from "../../util/config";
import { DispatchType } from "../store";

const initialState: CategoriesStateType = {
  categories: [],
  checkedCategories: [],
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
    checkCategories: (
      state: CategoriesStateType,
      action: PayloadAction<string>
    ) => {
      state.checkedCategories?.push(action.payload);
    },
    unCheckCategories: (
      state: CategoriesStateType,
      action: PayloadAction<string>
    ) => {
      const index: any = state.checkedCategories?.findIndex(
        (item: string) => item === action.payload
      );
      if (index !== -1) state.checkedCategories?.splice(index, 1);
    },
  },
});

export const { getCategoriesAction, checkCategories, unCheckCategories } =
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
