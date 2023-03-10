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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  useEffect(() => {
    reset(findedUser!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const html = (
    <>
      <form onSubmit={handleSubmit(submitHandle)}>
        {location.state?.createSuccess && (
          <div className="profile_main_info_item">
            <div className="profile_main_info_item_button">
              <span className="btn btn-success">
                Th??m ng?????i d??ng th??nh c??ng!
              </span>
            </div>
          </div>
        )}
        {findedUser &&
          Object.keys(findedUser).map((item: string): JSX.Element | null => {
            if (item === "matKhau" || item === "tenLoaiNguoiDung") return null;
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
                      <option value="GV">Gi??o v???</option>
                      <option value="HV">H???c vi??n</option>
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
                      {...register(item as keyof FindedUserInterface, {
                        required: "Kh??ng ???????c ????? tr???ng!",
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
                    ? `H???c vi??n ???? ????ng k?? kh??a h???c kh??ng th??? x??a`
                    : `X??a`}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <h2>Danh s??ch ??ang x??t duy???t</h2>
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
          <li>Danh s??ch tr???ng</li>
        )}
      </ul>

      <h2>Danh s??ch ???? x??t duy???t</h2>
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
          <li>Danh s??ch tr???ng</li>
        )}
      </ul>

      <h2>Kh??a h???c ???? t???o</h2>
      <ul className="modal_ul">
        {coursesArr?.filter(
          (item: CourseType) => item.nguoiTao.taiKhoan === userID
        ).length === 0 && <li>Danh s??ch r???ng</li>}
        {coursesArr
          ?.filter((item: CourseType) => item.nguoiTao.taiKhoan === userID)
          .map((item: CourseType) => {
            return (
              <li key={item.maKhoaHoc}>
                <Link
                  to={`/profile/courses_manage/${item.maKhoaHoc}`}
                  state={{ inside: true }}
                >
                  {item.tenKhoaHoc}
                </Link>
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
    <Modal toggle={toggle} show={true} title="Ch???nh s???a th??ng tin h???c vi??n">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {deleteResult ? (
            <span className="btn btn-danger">{deleteResult}</span>
          ) : (
            html
          )}
        </>
      )}
    </Modal>
  );
};

export default UsersEditForm;
