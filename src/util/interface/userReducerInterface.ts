import { RegisterdCoursesDetailType } from "./courseReducerInterface";

export interface FindedUserInterface {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  matKhau: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface UserInfoStateType {
  userInfo: UserInfoType | null;
  loading: boolean;
  userList: UserListType[] | null;
  findedUser: FindedUserInterface | null;
}

export interface UserListType {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}

export interface UserInfoType {
  chiTietKhoaHocGhiDanh?: RegisterdCoursesDetailType[] | any;
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
  taiKhoan: string;
  matKhau: string;
}

export interface RegisterInputType {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export interface dataGhiDanh {
  maKhoaHoc: string | undefined;
  taiKhoan: string | undefined;
}

export interface DanhSachGhiDanh {
  biDanh: string;
  hoTen: string;
  taiKhoan: string;
}
