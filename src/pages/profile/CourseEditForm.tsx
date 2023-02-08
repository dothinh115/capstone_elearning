import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
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
import {
  updateDeleteResultReducer,
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { dangKyApi } from "../../redux/userReducer/userReducer";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { UpdateCourseType } from "../../util/interface/courseReducerInterface";
import {
  DanhSachGhiDanh,
  dataGhiDanh,
} from "../../util/interface/userReducerInterface";

type Props = {};

const CourseEditForm = (props: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { choXetDuyet, daXetDuyet } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { courseDetail } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const pageReducer = useSelector((store: ReduxRootType) => store.pageReducer);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: DispatchType = useDispatch();
  const { courseID } = useParams();
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCourseType>({
    mode: "onChange",
  });

  const editSubmitHandle = async (data: any) => {
    console.log(data.hinhAnh.length);
    data = {
      ...data,
      ...(data.hinhAnh !== undefined && { hinhAnh: data.hinhAnh[0] }),
    };
    console.log(data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    await dispatch(
      courseUpdateApi(
        typeof data.hinhAnh === "string" ? data : formData,
        typeof data.hinhAnh === "string" ? false : true
      )
    );
    firstLoad();
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
    await dispatch(layDSChoXetDuyetApi(courseID));
    await dispatch(layDSDaXetDuyetApi(courseID));
  };

  const firstLoad = async () => {
    setLoading(true);
    await getCourseUserList();
    await dispatch(getCourseDetailApi(courseID));
    setLoading(false);
  };

  useEffect(() => {
    if (courseID) firstLoad();
  }, [courseID]);

  useEffect(() => {
    const obj = {
      maKhoaHoc: courseDetail?.maKhoaHoc,
      tenKhoaHoc: courseDetail?.tenKhoaHoc,
      moTa: courseDetail?.moTa,
      luotXem: 0,
      danhGia: 0,
      maNhom: courseDetail?.maNhom,
      ngayTao: courseDetail?.ngayTao,
      maDanhMucKhoaHoc: courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: courseDetail?.nguoiTao.taiKhoan,
      hinhAnh: courseDetail?.hinhAnh,
    };
    reset(obj);
  }, [courseDetail]);

  useEffect(() => {
    return () => {
      dispatch(layDSChoXetDuyetAction(null));
      dispatch(layDSDaXetDuyetAction(null));
      dispatch(getCourseDetailAction(null));
      dispatch(updateSuccessMessageReducer(null));
      dispatch(updateErrorMessageReducer(null));
      dispatch(updateDeleteResultReducer(null));
    };
  }, []);

  const html = (
    <>
      <form onSubmit={handleSubmit(editSubmitHandle)}>
        <div className="profile_main_info_item">
          <img
            src={courseDetail?.hinhAnh}
            onError={({ currentTarget }) => {
              currentTarget.src = "../../img/Nodejs.png";
            }}
            alt=""
          />
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
          <div className="profile_main_info_item_title">
            <i className="fa-solid fa-image"></i>Hình ảnh
          </div>
          <div className="profile_main_info_item_input">
            <input
              type="file"
              {...register("hinhAnh")}
              placeholder="Link hình ảnh"
            />
          </div>
          {errors.hinhAnh?.message && (
            <div className="profile_main_info_item_error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.hinhAnh?.message}
            </div>
          )}
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

        {(pageReducer.successMessage || pageReducer.errorMessage) && (
          <div className="profile_main_info_item_result">
            <span
              className={`btn ${
                (pageReducer.successMessage && "btn-success") ||
                (pageReducer.errorMessage && "btn-danger")
              }`}
            >
              {pageReducer.successMessage} {pageReducer.errorMessage}
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

  if (loading)
    return (
      <Modal show={true} toggle={toggle} title="Thông báo">
        <div className="loader"></div>
      </Modal>
    );

  if (userInfo?.maLoaiNguoiDung !== "GV")
    return (
      <Modal show={true} toggle={toggle} title="Thông báo">
        <p className="btn btn-info">
          Chỉ có tài khoản GV mới được chỉnh sửa khóa học!
        </p>
      </Modal>
    );

  if (pageReducer.deleteResult)
    return (
      <Modal show={true} toggle={toggle} title="Xóa thành công">
        <p className="btn btn-danger">Xóa khóa học thành công</p>
      </Modal>
    );

  return (
    <Modal show={true} toggle={toggle} title="Chỉnh sửa khóa học">
      {html}
    </Modal>
  );
};

export default CourseEditForm;
