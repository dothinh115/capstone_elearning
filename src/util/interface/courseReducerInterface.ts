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
  hinhAnh: string;
  maNhom: string;
  ngayTAO: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTAO: string;
}

export interface CourseStateType {
  coursesArr: CourseType[] | null;
  randomCoursesArr: CourseType[] | null;
  loading: boolean;
  courseDetail: CourseType | null;
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
