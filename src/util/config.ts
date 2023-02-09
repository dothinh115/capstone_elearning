import axios, { AxiosError, AxiosInstance } from "axios";
import { getLocalStorage, removeLocalStorage } from "./function";

export const CYBERSOFT_TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

export const token = getLocalStorage("userInfo")?.accessToken;

export const numberRandomCourses: number = 6;
export const numberRelatedCourses: number = 8;
export const limitCategoriesCourses: number = 9; // thu gọn khóa học ở /categories
export const limitCategoriesCoursesViewMore: number = 6; // bấm xem thêm sẽ hiện thêm
export const limitProfileCoursesView: number = 15;
export const limitProfileCoursesViewMore: number = 5;
export const registerSuccessMess = "Đăng ký tài khoản thành công";
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
    Authorization: "Bearer " + token,
    TokenCybersoft: CYBERSOFT_TOKEN,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeLocalStorage("userInfo");
      window.location.reload();
    }

    // if (error.response?.status === 400) {
    //   window.location.href = "/";
    // }
    return Promise.reject(error);
  }
);

interface LoginInputType {
  id: string[];
  title: string[];
  icon: string[];
}

interface RegisterConfigType {
  id: string[];
  title: string[];
  icon: string[];
  regex: RegExp[];
  errors: string[];
  placeHolder: string[];
}

interface ProfileMenuConfigType {
  path: string[];
  title: string[];
  modalPopup: boolean[];
  icon: string[];
}

export const profileMenuConfig: ProfileMenuConfigType = {
  path: [
    "/profile/view_profile",
    "/profile/registered_courses",
    "/profile/courses_manage",
  ],
  title: ["Thông tin tài khoản", "Khóa học đã đăng ký", "Quản lý khóa học"],
  modalPopup: [true, true, true],
  icon: ["house", "key", "list-check"],
};

export const loginInputData: LoginInputType = {
  id: ["taiKhoan", "matKhau"],
  title: ["Tài khoản", "Mật khẩu"],
  icon: ["user", "lock"],
};

export interface ApiResultType {
  successMess?: string;
  errorMess?: string;
  deleteSuccessMess?: string;
}

export const registerInputData: RegisterConfigType = {
  id: [
    "taiKhoan",
    "matKhau",
    "hoTen",
    "soDT",
    "maLoaiNguoiDung",
    "maNhom",
    "email",
  ],
  title: [
    "Tài khoản",
    "Mật khẩu",
    "Họ tên",
    "Số điện thoại",
    "Mã loại người dùng",
    "Mã nhóm",
    "Email",
  ],
  icon: ["user", "lock", "file-signature", "phone", "user-group", "code", "at"],
  regex: [
    /[^]*/,
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
    /^[0-9]+$/,
    /[^]*/,
    /[^]*/,
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  ],
  errors: [
    "",
    "Mật khẩu không đúng định dạng!",
    "Chỉ chứa ký tự!",
    "Chỉ chứa số!",
    "",
    "",
    "Email không đúng định dạng",
  ],
  placeHolder: [
    "Tên tài khoản",
    "Phải chứa ký tự in hoa, ký tự thường, số, và ký tự đặc biệt!",
    "Chỉ chứa ký tự!",
    "Chỉ chứa số!",
    "",
    "",
    "yourname@example.com",
  ],
};
