import { RegisterdCoursesDetailType } from "./courseReducerInterface";

export interface UserInfoStateType {
  userInfo: UserInfoType | null;
}

export interface UserInfoType {
  chiTietKhoaHocGhiDanh?: RegisterdCoursesDetailType[];
  taiKhoan: string;
  matKhau?: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface UserLoginType {
  taiKhoan: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
}

export interface LoginType {
  taiKhoan?: string;
  matKhau?: string;
}

export interface RegisterInputType {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}
