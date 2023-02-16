import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import {
  courseDeleteApi,
  courseUpdateApi,
  getCourseDetailAction,
  getCourseDetailApi,
  layDSChoXetDuyetApi,
  layDSDaXetDuyetApi,
  layHocVienChoXetDuyetAction,
  layHocVienDaXetDuyetAction,
  xetDuyetHocVienApi,
} from "../../../redux/courseReducer/courseReducer";
import {
  updateDeleteResultReducer,
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import { dangKyApi } from "../../../redux/userReducer/userReducer";
import { createNewCourseConfig } from "../../../util/config";
import { CategoriesType } from "../../../util/interface/categoriesReducerInterface";
import { UpdateCourseType } from "../../../util/interface/courseReducerInterface";
import {
  DanhSachGhiDanh,
  dataGhiDanh,
} from "../../../util/interface/userReducerInterface";

type Props = {};

const newCourse: UpdateCourseType = {
  maKhoaHoc: "",
  biDanh: "",
  tenKhoaHoc: "",
  luotXem: 0,
  danhGia: 0,
  maDanhMucKhoaHoc: "",
  hinhAnh: "",
  maNhom: "",
  ngayTAO: "",
  taiKhoanNguoiTAO: "",
  moTa: "",
};

const keysExcepted: string[] = [
  "maKhoaHoc",
  "biDanh",
  "luotXem",
  "danhGia",
  "maNhom",
  "ngayTAO",
  "taiKhoanNguoiTAO",
];

const CourseEditForm = (props: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { hocVienChoXetDuyet, hocVienDaXetDuyet } = useSelector(
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
  const [deleteResult, SetDeleteResult] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateCourseType>({
    mode: "onChange",
    defaultValues: newCourse,
  });

  const editSubmitHandle = async (data: UpdateCourseType) => {
    beforeGetOut();
    data = {
      ...data,
      ...(typeof data.hinhAnh !== "string" && { hinhAnh: data.hinhAnh[0] }),
    };
    const formData: FormData = new FormData();
    for (let key in data) {
      formData.append(key, data[key as keyof UpdateCourseType]);
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
    if (!hocVienChoXetDuyet && !hocVienDaXetDuyet) {
      const result = dispatch(courseDeleteApi(courseID!));
      result.then((res: any) => {
        SetDeleteResult(res);
      });
    }
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

  const beforeGetOut = () => {
    dispatch(updateSuccessMessageReducer(null));
    dispatch(updateErrorMessageReducer(null));
    dispatch(updateDeleteResultReducer(null));
  };

  const resetForm = () => {
    const obj: UpdateCourseType = {
      ...courseDetail!,
      danhGia: 0,
      ngayTAO: courseDetail!?.ngayTao,
      maDanhMucKhoaHoc: courseDetail!?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTAO: courseDetail!?.nguoiTao.taiKhoan,
    };
    reset(obj);
  };

  useEffect(() => {
    if (courseID) firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseID]);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetail]);

  useEffect(() => {
    return () => {
      dispatch(layHocVienChoXetDuyetAction(null));
      dispatch(layHocVienDaXetDuyetAction(null));
      dispatch(getCourseDetailAction(null));
      beforeGetOut();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {Object.keys(newCourse).map((item: string): JSX.Element | null => {
          for (let value of keysExcepted) {
            if (item === value) return null;
          }
          return (
            <div className="profile_main_info_item">
              <div className="profile_main_info_item_title">
                <i
                  className={`fa-solid fa-${
                    createNewCourseConfig.icon[
                      createNewCourseConfig.keys.indexOf(
                        item as keyof UpdateCourseType
                      )
                    ]
                  }`}
                ></i>
                {
                  createNewCourseConfig.title[
                    createNewCourseConfig.keys.indexOf(item)
                  ]
                }
              </div>
              <div className="profile_main_info_item_input">
                {item === "moTa" ? (
                  <textarea
                    className={
                      errors[item as keyof UpdateCourseType]?.message
                        ? "isInvalid"
                        : ""
                    }
                    {...register(item, {
                      required: "Không được để trống!",
                    })}
                  />
                ) : item === "maDanhMucKhoaHoc" ? (
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
                ) : item === "hinhAnh" ? (
                  <input
                    className={errors.hinhAnh?.message ? "isInvalid" : ""}
                    type="file"
                    {...register("hinhAnh")}
                    placeholder="Link hình ảnh"
                    onChange={({ currentTarget }) => {
                      const file = currentTarget.files![0];
                      if (file && file.size > 1000000)
                        setError("hinhAnh", {
                          message: "Dung lượng vượt quá 1Mb",
                        });
                      else clearErrors("hinhAnh");
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    className={
                      errors[item as keyof UpdateCourseType]?.message
                        ? "isInvalid"
                        : ""
                    }
                    {...register(item as keyof UpdateCourseType, {
                      required: "Không được để trống!",
                    })}
                  />
                )}
              </div>
              {errors[item as keyof UpdateCourseType]?.message && (
                <div className="profile_main_info_item_error">
                  <>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors[item as keyof UpdateCourseType]?.message}
                  </>
                </div>
              )}
            </div>
          );
        })}

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

      <div className="profile_main_info_item">
        <div className="profile_main_info_item_button">
          <button
            disabled={hocVienChoXetDuyet || hocVienDaXetDuyet ? true : false}
            type="button"
            className="btn btn-danger"
            onClick={deleteHandle}
          >
            {hocVienChoXetDuyet || hocVienDaXetDuyet
              ? `Khóa học có học viên không thể xóa`
              : `Xóa`}
          </button>
        </div>
      </div>

      <h2>Danh sách đang xét duyệt</h2>
      <ul className="modal_ul">
        {hocVienChoXetDuyet ? (
          hocVienChoXetDuyet?.map((item: DanhSachGhiDanh, index: number) => {
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
        {hocVienDaXetDuyet ? (
          hocVienDaXetDuyet?.map((item: DanhSachGhiDanh, index: number) => {
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
    </>
  );

  if (loading)
    return (
      <Modal show={true} toggle={toggle} title="Thông báo">
        <div className="loader"></div>
      </Modal>
    );

  if (deleteResult)
    return (
      <Modal show={true} toggle={toggle} title="Xóa thành công">
        <p className="btn btn-danger">{deleteResult}</p>
      </Modal>
    );

  return (
    <Modal show={true} toggle={toggle} title="Chỉnh sửa khóa học">
      {html}
    </Modal>
  );
};

export default CourseEditForm;
