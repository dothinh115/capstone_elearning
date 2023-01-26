import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxRootType } from "../../redux/store";

import { registerInputData } from "../../util/config";
import { showMaNhom } from "../../util/function";
import { RegisterdCoursesDetailType } from "../../util/interface/courseReducerInterface";
import {
  RegisterInputType,
  UserInfoType,
} from "../../util/interface/userReducerInterface";
type Props = {
  page?: string | null;
};

const Profile = ({ page }: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoType>({
    mode: "onChange",
    defaultValues: { ...userInfo },
  });

  const submitHandle = (data: UserInfoType): void => {
    console.log(data);
  };

  let abc: string | string[] = ["abcdefz", "apfng world", "pfiek"];
  const filter = abc.filter((item) => item.includes("adsfads"));
  console.log(filter);

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
                <h3>Đỗ Thịnh</h3>
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
                      if (index === 1) return false;
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
                            {index === 4 ? (
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
                <div className="profile_container_main_block">
                  <div className="profile_container_main_block_button">
                    <button className="btn btn-primary">Update</button>
                  </div>
                </div>
              </form>
            )}

            {page === "registed_courses" && (
              <ul>
                {userInfo?.chiTietKhoaHocGhiDanh?.map(
                  (course: RegisterdCoursesDetailType, index: number) => {
                    return (
                      <>
                        <li key={index}>{course.tenKhoaHoc}</li>
                      </>
                    );
                  }
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
