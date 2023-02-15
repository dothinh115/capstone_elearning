import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import {
  courseDeleteApi,
  layDsKhoaHocChoGhiDanh,
  layDsKhoaHocDaGhiDanh,
  layKhoaHocChoXetDuyetAction,
  layKhoaHocDaXetDuyetAction,
  xetDuyetHocVienApi,
} from "../../../redux/courseReducer/courseReducer";
import {
  updateDeleteResultReducer,
  updateErrorMessageReducer,
  updateGlobalMessageReducer,
  updateSuccessMessageReducer,
} from "../../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import {
  dangKyApi,
  deleteUserApi,
  findUserApi,
  getFindedUserReducer,
  updateUserInfoApi,
} from "../../../redux/userReducer/userReducer";
import { EditingUserConfig, registerInputData } from "../../../util/config";
import {
  CourseType,
  KhoaHocXetDuyetInterface,
} from "../../../util/interface/courseReducerInterface";
import {
  dataGhiDanh,
  FindedUserInterface,
  UserInfoType,
  UserListType,
} from "../../../util/interface/userReducerInterface";

type Props = {};

const UsersEditForm = (props: Props) => {
  const { toggle } = useModal();
  const { userID } = useParams();
  const location = useLocation();
  const { findedUser } = useSelector(
    (store: ReduxRootType) => store.userReducer
  );
  const { khoaHocChoXetDuyet, khoaHocDaXetDuyet, coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );

  const { deleteResult, globalMessage, successMessage, errorMessage } =
    useSelector((store: ReduxRootType) => store.pageReducer);

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: DispatchType = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FindedUserInterface>({
    mode: "onChange",
  });

  const deleteUser = (userID: string | undefined) => {
    dispatch(deleteUserApi(userID));
  };

  const submitHandle = (data: FindedUserInterface) => {
    const payload: UserInfoType = {
      taiKhoan: data.taiKhoan,
      matKhau: data.matKhau,
      hoTen: data.hoTen,
      soDT: data.soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: data.maLoaiNguoiDung,
      email: data.email,
    };
    dispatch(updateUserInfoApi(payload));
  };

  const registeredUserDeleteHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    maKhoaHoc: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userID,
    };
    await dispatch(dangKyApi(false, data));
    reloadDanhSach();
  };

  const courseDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    courseID: string
  ) => {
    event.preventDefault();
    dispatch(courseDeleteApi(courseID));
  };

  const registeredUserConfirmHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    maKhoaHoc: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userID,
    };
    await dispatch(xetDuyetHocVienApi(data));
    reloadDanhSach();
  };

  const firstLoad = async () => {
    setLoading(true);
    await dispatch(findUserApi(userID));
    await dispatch(layDsKhoaHocChoGhiDanh(userID));
    await dispatch(layDsKhoaHocDaGhiDanh(userID));
    setLoading(false);
  };

  const reloadDanhSach = () => {
    dispatch(layDsKhoaHocChoGhiDanh(userID));
    dispatch(layDsKhoaHocDaGhiDanh(userID));
  };

  useEffect(() => {
    firstLoad();
  }, [userID]);

  useEffect(() => {
    reset(findedUser!);
  }, [findedUser]);

  useEffect(() => {
    return () => {
      dispatch(updateDeleteResultReducer(null));
      dispatch(updateGlobalMessageReducer(null));
      dispatch(layKhoaHocDaXetDuyetAction(null));
      dispatch(layKhoaHocChoXetDuyetAction(null));
      dispatch(getFindedUserReducer(null));
      dispatch(updateSuccessMessageReducer(null));
      dispatch(updateErrorMessageReducer(null));
    };
  }, []);

  const html = (
    <>
      <form onSubmit={handleSubmit(submitHandle)}>
        {location.state?.createSuccess && (
          <div className="profile_main_info_item">
            <div className="profile_main_info_item_button">
              <span className="btn btn-success">
                Thêm người dùng thành công!
              </span>
            </div>
          </div>
        )}
        {findedUser &&
          Object.keys(findedUser).map((item: any) => {
            if (item === "matKhau" || item === "tenLoaiNguoiDung") return;
            return (
              <div className="profile_main_info_item" key={item}>
                <div className="profile_main_info_item_title">
                  <i
                    className={`fa fa-${
                      EditingUserConfig.icon[
                        EditingUserConfig.key.indexOf(
                          item as keyof UserListType
                        )
                      ]
                    }`}
                  ></i>
                  {
                    EditingUserConfig.title[
                      EditingUserConfig.key.indexOf(item as keyof UserListType)
                    ]
                  }
                </div>
                <div className="profile_main_info_item_input">
                  {item === "maLoaiNguoiDung" ? (
                    <select {...register(item)}>
                      <option value="GV">Giáo vụ</option>
                      <option value="HV">Học viên</option>
                    </select>
                  ) : (
                    <input
                      id={item}
                      type={`${item === "soDt" ? "number" : "text"}`}
                      className={
                        errors[item as keyof FindedUserInterface]?.message
                          ? "isInvalid"
                          : ""
                      }
                      {...register(item, {
                        required: "Không được để trống!",
                        pattern: {
                          value: new RegExp(
                            registerInputData.regex[
                              registerInputData.id.indexOf(item)
                            ]
                          ),
                          message:
                            registerInputData.errors[
                              registerInputData.id.indexOf(item)
                            ],
                        },
                      })}
                    />
                  )}
                </div>

                {errors[item as keyof FindedUserInterface]?.message && (
                  <div className="profile_main_info_error">
                    <p>
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors[item as keyof FindedUserInterface]?.message}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

        {(successMessage || errorMessage) && (
          <div className="profile_main_info_item">
            <div className="profile_main_info_item_button">
              <span
                className={`btn btn-${
                  (successMessage && "success") || (errorMessage && "danger")
                }`}
              >
                {(successMessage && successMessage) ||
                  (errorMessage && errorMessage)}
              </span>
            </div>
          </div>
        )}

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>

        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteUser(findedUser?.taiKhoan)}
              disabled={
                khoaHocChoXetDuyet || khoaHocDaXetDuyet || globalMessage
                  ? true
                  : false
              }
            >
              {globalMessage ? (
                globalMessage
              ) : (
                <>
                  {khoaHocChoXetDuyet || khoaHocDaXetDuyet
                    ? `Học viên đã đăng ký khóa học không thể xóa`
                    : `Xóa`}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <h2>Danh sách đang xét duyệt</h2>
      <ul className="modal_ul">
        {khoaHocChoXetDuyet ? (
          khoaHocChoXetDuyet?.map(
            (item: KhoaHocXetDuyetInterface, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/course/${item.maKhoaHoc}`}>
                    {item.tenKhoaHoc.length > 25
                      ? item.tenKhoaHoc.substring(0, 24) + "..."
                      : item.tenKhoaHoc}
                  </Link>

                  <span>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) => {
                        registeredUserConfirmHandle(event, item?.maKhoaHoc);
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(event) =>
                        registeredUserDeleteHandle(event, item.maKhoaHoc)
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </span>
                </li>
              );
            }
          )
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>

      <h2>Danh sách đã xét duyệt</h2>
      <ul className="modal_ul">
        {khoaHocDaXetDuyet ? (
          khoaHocDaXetDuyet?.map(
            (item: KhoaHocXetDuyetInterface, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/course/${item.maKhoaHoc}`}>
                    {item.tenKhoaHoc.length > 25
                      ? item.tenKhoaHoc.substring(0, 24) + "..."
                      : item.tenKhoaHoc}
                  </Link>

                  <span>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(event) =>
                        registeredUserDeleteHandle(event, item.maKhoaHoc)
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </span>
                </li>
              );
            }
          )
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>

      <h2>Khóa học đã tạo</h2>
      <ul className="modal_ul">
        {coursesArr?.filter(
          (item: CourseType) => item.nguoiTao.taiKhoan == userID
        ).length === 0 && <li>Danh sách rỗng</li>}
        {coursesArr
          ?.filter((item: CourseType) => item.nguoiTao.taiKhoan == userID)
          .map((item: CourseType) => {
            return (
              <li key={item.maKhoaHoc}>
                <Link to={`/course/${item.maKhoaHoc}`}>{item.tenKhoaHoc}</Link>
                <span>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(event) => courseDelete(event, item.maKhoaHoc)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );

  return (
    <Modal toggle={toggle} show={true} title="Chỉnh sửa thông tin học viên">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>{deleteResult ? <span className="btn">{deleteResult}</span> : html}</>
      )}
    </Modal>
  );
};

export default UsersEditForm;
