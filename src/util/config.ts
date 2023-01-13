import axios, { AxiosInstance } from "axios";

export const CYBERSOFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

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

export interface courseType {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTAO: string;
  soLuongHocVien: number;
  nguoiTAO: string;
  danhMucKhoaHoc: string;
}

export interface courseStateType {
  courses: courseType[] | null;
}
