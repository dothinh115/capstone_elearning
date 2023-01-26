import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { DispatchType, ReduxRootType } from "../../redux/store";
import {
  getUserInfoApi,
  ghiDanhApi,
  updateUserInfoApi,
} from "../../redux/userReducer/userReducer";

import { registerInputData } from "../../util/config";
import { showMaNhom } from "../../util/function";
import { RegisterdCoursesDetailType } from "../../util/interface/courseReducerInterface";
import {
  dataGhiDanh,
  RegisterInputType,
  UserInfoType,
} from "../../util/interface/userReducerInterface";
type Props = {
  page?: string | null;
};

const Profile = ({ page }: Props) => {
  const { token } = useToken();
  const dispatch: DispatchType = useDispatch();
  const { state } = useLocation();

  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfoType>({
    mode: "onChange",
    defaultValues: { ...userInfo, maLoaiNguoiDung: userInfo?.maLoaiNguoiDung },
  });

  const submitHandle = (data: UserInfoType): void => {
    dispatch(updateUserInfoApi(data));
  };

  const huyGhiDanhBtnHandle = (maKhoaHoc: string) => {
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(ghiDanhApi(false, data));
  };

  useEffect(() => {
    if (token) dispatch(getUserInfoApi);
  }, []);

  useEffect(() => {
    reset({ ...userInfo, maLoaiNguoiDung: userInfo?.maLoaiNguoiDung });
  }, [userInfo]);

  return (
    <>
      <section className="profile">
        <div className="profile_container">
          <div className="profile_container_header">
            <NavLink id="getout" to="/" className="btn btn-primary">
              <i className="fa-solid fa-arrow-left-long"></i>
            </NavLink>
            <h2>Trang cá nhân</h2>
          </div>
          <div className="profile_container_sidebar">
            <div className="profile_container_sidebar_header">
              <div className="profile_container_sidebar_header_avatar">
                <img src="../../img/12693195.jpg" alt="" />
              </div>
              <div className="profile_container_sidebar_header_info">
                <h3>{userInfo?.hoTen}</h3>
              </div>
            </div>
            <div className="profile_container_sidebar_menu">
              <ul>
                <li>
                  <NavLink to="/profile">
                    <i className="fa-solid fa-house"></i>Thông tin tài khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile/registed_courses">
                    <i className="fa-solid fa-key"></i>Khóa học đã đăng ký
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile_container_main">
            {page === null && (
              <form onSubmit={handleSubmit(submitHandle)}>
                <div className="profile_container_main_block">
                  {registerInputData.id.map(
                    (item: string | any, index: number) => {
                      if (item === "matKhau") return false;
                      const reg = new RegExp(registerInputData.regex[index]);
                      return (
                        <div
                          className="profile_container_main_block_item"
                          key={index}
                        >
                          <div className="profile_container_main_block_item_title">
                            <i
                              className={`fa fa-${registerInputData.icon[index]}`}
                            ></i>
                            {registerInputData.title[index]}:
                          </div>
                          <div className="profile_container_main_block_item_input">
                            {item === "maNhom" ? (
                              <select {...register(item)}>
                                {showMaNhom().map((val: JSX.Element) => {
                                  return val;
                                })}
                              </select>
                            ) : (
                              <input
                                type={`${
                                  (item === "soDT" && "number") ||
                                  (item === "email" && "email")
                                }`}
                                {...register(item, {
                                  required: `${registerInputData.title[index]} không được để trống!`,
                                  pattern: {
                                    value: reg,
                                    message: registerInputData.errors[index],
                                  },
                                })}
                                placeholder={
                                  registerInputData.placeHolder[index]
                                }
                              />
                            )}
                          </div>
                          {errors[item as keyof RegisterInputType]?.message && (
                            <div className="profile_container_main_block_item_error">
                              <p>
                                <i className="fa-solid fa-circle-exclamation"></i>
                                {
                                  errors[item as keyof RegisterInputType]
                                    ?.message
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
                {(state?.errorMess || state?.successMess) && (
                  <div className="profile_container_main_block">
                    <p
                      className={`show_result ${
                        (state.errorMess && "errors") ||
                        (state.successMess && "success")
                      }`}
                    >
                      <i
                        className={`fa-solid fa-${
                          (state.errorMess && "circle-exclamation fa-sharp") ||
                          (state.successMess && "check")
                        }`}
                      ></i>
                      {state.errorMess}
                      {state.successMess}
                    </p>
                  </div>
                )}

                <div className="profile_container_main_block">
                  <div className="profile_container_main_block_button">
                    <button className="btn btn-primary">Update</button>
                  </div>
                </div>
              </form>
            )}

            {page === "registed_courses" && (
              <ul>
                {userInfo?.chiTietKhoaHocGhiDanh?.length === 0 ? (
                  <div className="profile_container_main_block">
                    {" "}
                    Chưa ghi danh khóa học nào!
                  </div>
                ) : (
                  userInfo?.chiTietKhoaHocGhiDanh?.map(
                    (course: RegisterdCoursesDetailType, index: number) => {
                      return (
                        <li key={index}>
                          <Link to={`/course/${course.maKhoaHoc}`}>
                            {course.tenKhoaHoc}
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              huyGhiDanhBtnHandle(course.maKhoaHoc)
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </li>
                      );
                    }
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
