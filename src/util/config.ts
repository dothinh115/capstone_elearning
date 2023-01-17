import axios, { AxiosInstance } from "axios";

export const CYBERSOFT_TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

export const numberRandomCourses: number = 6;

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
}

export interface Categories {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface CourseStateType {
  coursesArr: CourseType[] | null;
  randomCoursesArr: CourseType[] | null;
  loading: boolean;
  courseDetail: CourseType | null;
  categories: Categories[] | null;
  relatedCourses: CourseType[] | null;
}
/* COURSES REDUCER INTERFACE */
