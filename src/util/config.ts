import axios, { AxiosInstance } from "axios";

export const CYBERSOFT_TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

export const numberRandomCourses: number = 6;
export const numberRelatedCourses: number = 8;
export const limitCategoriesCourses: number = 6; // thu gọn khóa học ở /categories
export const limitCategoriesCoursesViewMore: number = 4; // bấm xem thêm sẽ hiện thêm
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
