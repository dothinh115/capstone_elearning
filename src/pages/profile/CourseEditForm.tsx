import React, { useEffect } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  courseDeleteApi,
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
  handleSubmit: UseFormHandleSubmit<UpdateCourseType>;
  editSubmitHandle: any;
  register: UseFormRegister<UpdateCourseType>;
  errors: any;
};

const CourseEditForm = ({
  handleSubmit,
  editSubmitHandle,
  register,
  errors,
}: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { choXetDuyet, daXetDuyet } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { state } = useLocation();
  const dispatch: DispatchType = useDispatch();

  const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const maKhoaHoc = state?.maKhoaHoc;
    dispatch(courseDeleteApi(maKhoaHoc));
  };

  const registeredUserDeleteHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    taiKhoan: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc: state?.maKhoaHoc,
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
      maKhoaHoc: state?.maKhoaHoc,
      taiKhoan,
    };
    await dispatch(xetDuyetHocVienApi(data));
    getCourseUserList();
  };

  const getCourseUserList = () => {
    dispatch(layDSChoXetDuyetApi(state?.maKhoaHoc));
    dispatch(layDSDaXetDuyetApi(state?.maKhoaHoc));
  };

  useEffect(() => {
    if (state.maKhoaHoc) getCourseUserList();
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(layDSChoXetDuyetAction(null));
      dispatch(layDSDaXetDuyetAction(null));
    };
  }, []);

  if (state.deleteSuccess) return <>{state.deleteSuccess}</>;

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

        {(state.successMess || state.errorMess) && (
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
