import { DanhSachGhiDanh } from "./userReducerInterface";

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

export interface UpdateCourseType {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: any;
  maNhom: string;
  ngayTAO: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTAO: string;
}

export interface KhoaHocXetDuyetInterface {
  maKhoaHoc: string;
  tenKhoaHoc: string;
}

export interface CourseStateType {
  coursesArr: CourseType[] | null;
  randomCoursesArr: CourseType[] | null;
  loading: boolean;
  courseDetail: CourseType | null;
  hocVienChoXetDuyet: DanhSachGhiDanh[] | null;
  hocVienDaXetDuyet: DanhSachGhiDanh[] | null;
  khoaHocChoXetDuyet: KhoaHocXetDuyetInterface[] | null;
  khoaHocDaXetDuyet: KhoaHocXetDuyetInterface[] | null;
}

export interface RegisterdCoursesDetailType {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: string;
  danhGia: number;
}

export interface CreateNewCourseType {
  keys: string[];
  title: string[];
  icon: string[];
}
