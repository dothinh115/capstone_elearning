import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
import {
  courseDeleteApi,
  courseUpdateApi,
  getCourseDetailAction,
  getCourseDetailApi,
  layDSChoXetDuyetAction,
  layDSChoXetDuyetApi,
  layDSDaXetDuyetAction,
  layDSDaXetDuyetApi,
  xetDuyetHocVienApi,
} from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { dangKyApi } from "../../redux/userReducer/userReducer";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { UpdateCourseType } from "../../util/interface/courseReducerInterface";
import {
  DanhSachGhiDanh,
  dataGhiDanh,
} from "../../util/interface/userReducerInterface";

type Props = {
  courseID: string | null;
  setCourseID: React.Dispatch<React.SetStateAction<string | null>>;
};

const CourseEditForm = ({ courseID, setCourseID }: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { choXetDuyet, daXetDuyet } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { courseDetail } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { state } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: DispatchType = useDispatch();
  const { pathname, search } = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCourseType>({
    mode: "onChange",
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTAO: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTAO: "",
    },
  });

  const editSubmitHandle = (data: UpdateCourseType): void => {
    dispatch(courseUpdateApi(data));
  };

  const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!choXetDuyet && !daXetDuyet) dispatch(courseDeleteApi(courseID!));
  };

  const registeredUserDeleteHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    taiKhoan: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc: courseID!,
      taiKhoan,
    };
    await dispatch(dangKyApi(false, data));
    getCourseUserList();
  };

  const registeredUserConfirmHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    taiKhoan: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc: courseID!,
      taiKhoan,
    };
    await dispatch(xetDuyetHocVienApi(data));
    getCourseUserList();
  };

  const getCourseUserList = async () => {
    await dispatch(layDSChoXetDuyetApi(courseID!));
    await dispatch(layDSDaXetDuyetApi(courseID!));
  };

  const firstLoad = async () => {
    setLoading(true);
    await getCourseUserList();
    await dispatch(getCourseDetailApi(courseID!));
    setLoading(false);
  };

  useEffect(() => {
    if (courseID) firstLoad();
  }, [courseID]);

  useEffect(() => {
    const obj = {
      maKhoaHoc: courseDetail?.maKhoaHoc,
      biDanh: courseDetail?.biDanh,
      tenKhoaHoc: courseDetail?.tenKhoaHoc,
      moTa: courseDetail?.moTa,
      luotXem: courseDetail?.luotXem,
      danhGia: 5,
      hinhAnh: courseDetail?.hinhAnh,
      maNhom: courseDetail?.maNhom,
      ngayTAO: courseDetail?.ngayTao,
      maDanhMucKhoaHoc: courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTAO: courseDetail?.nguoiTao.taiKhoan,
    };
    reset(obj);
  }, [courseDetail]);

  useEffect(() => {
    return () => {
      dispatch(layDSChoXetDuyetAction(null));
      dispatch(layDSDaXetDuyetAction(null));
      dispatch(getCourseDetailAction(null));
      history.push(pathname + search, {
        replace: true,
      });
      setCourseID(null);
    };
  }, []);

  if (state?.deleteSuccess)
    return (
      <div className="btn btn-success">
        <i
          style={{ fontSize: "16px", marginRight: "5px" }}
          className="fa-solid fa-check"
        ></i>{" "}
        {state?.deleteSuccess}
      </div>
    );

  if (loading) return <div className="loader"></div>;

  return (
    <>
      <form onSubmit={handleSubmit(editSubmitHandle)}>
        <div className="profile_main_info_item">
          <div className="profile_main_info_item_title">
            {" "}
            <i className="fa-solid fa-sliders"></i>Mã khóa học
          </div>
          <div className="profile_main_info_item_input">
            <input
              disabled
              type="text"
              {...register("maKhoaHoc", {
                required: "Không được để trống!",
              })}
            />
          </div>
        </div>

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_title">
            <i className="fa-solid fa-tag"></i>Tên khóa học
          </div>
          <div className="profile_main_info_item_input">
            <input
              type="text"
              {...register("tenKhoaHoc", {
                required: "Không được để trống!",
              })}
            />
          </div>
          {errors.tenKhoaHoc?.message && (
            <div className="profile_main_info_item_error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.tenKhoaHoc?.message}
            </div>
          )}
        </div>

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_title">
            <i className="fa-solid fa-bars"></i>Danh mục
          </div>
          <div className="profile_main_info_item_input">
            <select
              {...register("maDanhMucKhoaHoc", {
                required: "Không được để trống!",
              })}
            >
              {categories?.map((item: CategoriesType, index: number) => {
                return (
                  <option key={index} value={item.maDanhMuc}>
                    {item.tenDanhMuc}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_title">Mô tả</div>
          <div className="profile_main_info_item_input">
            <textarea
              {...register("moTa", {
                required: "Không được để trống!",
              })}
            />
          </div>
          {errors.moTa?.message && (
            <div className="profile_main_info_item_error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.moTa?.message}
            </div>
          )}
        </div>

        {(state?.successMess || state?.errorMess) && (
          <div className="profile_main_info_item_result">
            <span
              className={`btn ${
                (state.successMess && "btn-success") ||
                (state.errorMess && "btn-danger")
              }`}
            >
              {state.successMess} {state.errorMess}
            </span>
          </div>
        )}

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>

      <h2>Danh sách đang xét duyệt</h2>
      <ul className="modal_ul">
        {choXetDuyet ? (
          choXetDuyet?.map((item: DanhSachGhiDanh, index: number) => {
            return (
              <li key={index}>
                <span>
                  {item.hoTen.length > 25
                    ? item.hoTen.substring(0, 24) + "..."
                    : item.hoTen}
                </span>
                <span>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(event) =>
                      registeredUserConfirmHandle(event, item?.taiKhoan)
                    }
                  >
                    <i className="fa-solid fa-check"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(event) =>
                      registeredUserDeleteHandle(event, item?.taiKhoan)
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </span>
              </li>
            );
          })
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>

      <h2>Danh sách đã xét duyệt</h2>
      <ul className="modal_ul">
        {daXetDuyet ? (
          daXetDuyet?.map((item: DanhSachGhiDanh, index: number) => {
            return (
              <li key={index}>
                <span>
                  {item.hoTen.length > 25
                    ? item.hoTen.substring(0, 24) + "..."
                    : item.hoTen}
                </span>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(event) =>
                    registeredUserDeleteHandle(event, item?.taiKhoan)
                  }
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            );
          })
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>

      <div className="profile_main_info_item">
        <div className="profile_main_info_item_button">
          <button
            disabled={choXetDuyet || daXetDuyet ? true : false}
            type="button"
            className="btn btn-danger"
            onClick={deleteHandle}
          >
            {choXetDuyet || daXetDuyet
              ? `Khóa học có học viên không thể xóa`
              : `Xóa`}
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseEditForm;
