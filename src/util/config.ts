import axios, { AxiosInstance } from "axios";

export const CYBERSOFT_TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

export const numberRandomCourses: number = 3;
export const numberRelatedCourses: number = 8;
export const randomBadgeArr: string[] = [
  "danger",
  "info",
  "primary",
  "success",
  "warning",
  "dark",
];

//axios config
export const API: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    Authorization: "token",
    TokenCybersoft: CYBERSOFT_TOKEN,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/********** Interface / type **********/

/* COURSES REDUCER INTERFACE */
interface NguoiTao {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface CourseType {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: NguoiTao;
  danhMucKhoaHoc: DanhMucKhoaHoc;
  discount?: number;
}

export interface CourseStateType {
  coursesArr: CourseType[] | null;
  randomCoursesArr: CourseType[] | null;
  loading: boolean;
  courseDetail: CourseType | null;
  coursesByCategory: CourseType[] | null;
}
/* COURSES REDUCER INTERFACE */

export interface CategoriesType {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface CategoriesStateType {
  categories: CategoriesType[] | null;
  checkedCategories?: string[] | null;
}
/* CATEGORIES REDUCER INTERFACE */
