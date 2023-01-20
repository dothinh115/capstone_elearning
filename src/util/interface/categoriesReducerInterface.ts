import { CourseType } from "./courseReducerInterface";

export interface CategoriesType {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface CategoriesStateType {
  categories: CategoriesType[] | null;
  limitCouses: number;
  coursesByCategories: CourseType[] | null;
  categoriesLoading: boolean;
}
