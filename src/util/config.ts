import axios, { AxiosError, AxiosInstance } from "axios";

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
  (error: AxiosError) => {
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
  regex: string[];
  errors: string[];
  placeHolder: string[];
}

export const loginInputData: LoginInputType = {
  id: ["taiKhoan", "matKhau"], //id[0]
  title: ["Tài khoản", "Mật khẩu"],
  icon: ["user", "lock"],
};

export const registerInputData: RegisterConfigType = {
  id: ["taiKhoan", "matKhau", "hoTen", "soDT", "maNhom", "email"],
  title: [
    "Tài khoản",
    "Mật khẩu",
    "Họ Tên",
    "Số điện thoại",
    "Mã nhóm",
    "Email",
  ],
  icon: ["user", "lock", "file-signature", "phone", "user-group", "at"],
  regex: [
    "",
    "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{0,}$/",
    "/^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/",
    "/^[0-9]+$/",
    "",
    "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
  ],
  errors: [
    "",
    "Mật khẩu không đúng định dạng!",
    "Chỉ chứa ký tự!",
    "Chỉ chứa số!",
    "",
    "Email không đúng định dạng",
  ],
  placeHolder: [
    "Tên tài khoản",
    "Phải chứa ký tự in hoa, ký tự thường, số, và ký tự đặc biệt!",
    "Chỉ chứa ký tự!",
    "Chỉ chứa số!",
    "",
    "yourname@example.com",
  ],
};
