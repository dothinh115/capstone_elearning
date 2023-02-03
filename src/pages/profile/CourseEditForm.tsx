import React, { useEffect, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { courseDeleteApi } from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { dangKyApi } from "../../redux/userReducer/userReducer";
import { API } from "../../util/config";
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
  const [choXetDuyet, setChoXetDuyet] = useState<DanhSachGhiDanh[] | null>(
    null
  );
  const [daXetDuyet, setDaXetDuyet] = useState<DanhSachGhiDanh[] | null>(null);
  const { state } = useLocation();
  const dispatch: DispatchType = useDispatch();

  const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const maKhoaHoc = state?.maKhoaHoc;
    dispatch(courseDeleteApi(maKhoaHoc));
  };

  const layDSChoXetDuyet = async () => {
    let data: DanhSachGhiDanh[] | null = null;
    try {
      const danhSachChoXetDuyet = await API.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        {
          maKhoaHoc: state?.maKhoaHoc,
        }
      );
      if (danhSachChoXetDuyet.data.length !== 0)
        data = danhSachChoXetDuyet.data;
      setChoXetDuyet(data);
    } catch (error) {
      console.log(error);
    }
  };

  const layDSDaXetDuyet = async () => {
    let data: DanhSachGhiDanh[] | null = null;
    try {
      const danhSachDaXetDuyet = await API.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        {
          maKhoaHoc: state?.maKhoaHoc,
        }
      );
      if (danhSachDaXetDuyet.data.length !== 0) data = danhSachDaXetDuyet.data;
      setDaXetDuyet(data);
    } catch (error) {
      console.log(error);
    }
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
    layDSChoXetDuyet();
    layDSDaXetDuyet();
  };

  useEffect(() => {
    if (state.maKhoaHoc) {
      layDSChoXetDuyet();
      layDSDaXetDuyet();
    }
  }, [state]);

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
                <span>{item.hoTen}</span>
                <span>
                  <button className="btn btn-success">
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
          <>Danh sách trống</>
        )}
      </ul>

      <h2>Danh sách đã xét duyệt</h2>
      <ul className="modal_ul">
        {daXetDuyet ? (
          daXetDuyet?.map((item: DanhSachGhiDanh, index: number) => {
            return (
              <li key={index}>
                <span>{item.hoTen}</span>
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
          <>Danh sách trống</>
        )}
      </ul>

      {!choXetDuyet && !daXetDuyet && (
        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteHandle}
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseEditForm;
