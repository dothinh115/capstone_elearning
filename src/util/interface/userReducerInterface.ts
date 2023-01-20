export interface UserInfoStateType {
  userInfo: UserInfoType | null;
}

export interface UserInfoType {
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
