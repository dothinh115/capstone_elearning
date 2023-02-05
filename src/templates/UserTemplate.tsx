import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useOutlet } from "react-router-dom";
import { DispatchType, ReduxRootType } from "../redux/store";
import { removeLocalStorage } from "../util/function";
import { limitProfileCoursesView, profileMenuConfig } from "../util/config";
import EditProfile from "../pages/profile/EditProfile";
import {
  setCoursesManageScroll,
  setCoursesViewNumber,
  setRegisteredCoursesScroll,
  setRegisteredCoursesViewNumber,
} from "../redux/profileReducer/profileReducer";

const UserTemplate = () => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { prevPage } = useSelector((store: ReduxRootType) => store.pageReducer);
  const logout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    removeLocalStorage("userInfo");
    window.location.href = "/";
  };
  const dispatch: DispatchType = useDispatch();
  const outlet = useOutlet();

  const resetScroll = (): void => {
    dispatch(setCoursesManageScroll(0));

    dispatch(setCoursesViewNumber(limitProfileCoursesView));
    dispatch(setRegisteredCoursesScroll(0));
    dispatch(setRegisteredCoursesViewNumber(limitProfileCoursesView));
  };

  if (window.innerWidth <= 600) {
    return (
      <section className="profile">
        <div className="profile_container">
          <div className="profile_container_header">
            <NavLink id="getout" to={prevPage!} className="btn btn-primary">
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
                {profileMenuConfig.path.map((item: string, index: number) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={item}
                        state={{ inside: true }}
                        onClick={resetScroll}
                      >
                        <i
                          className={`fa-solid fa-${profileMenuConfig.icon[index]}`}
                        ></i>
                        {profileMenuConfig.title[index]}
                      </NavLink>
                    </li>
                  );
                })}
                <li>
                  <button onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile_container">
        <div className="profile_container_header">
          <NavLink id="getout" to={prevPage!} className="btn btn-primary">
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
              {profileMenuConfig.path.map((item: string, index: number) => {
                return (
                  <li key={index}>
                    <NavLink to={item}>
                      <i
                        className={`fa-solid fa-${profileMenuConfig.icon[index]}`}
                      ></i>
                      {profileMenuConfig.title[index]}
                    </NavLink>
                  </li>
                );
              })}
              <li>
                <button onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile_container_main">
          {window.innerWidth > 600 && !outlet && <EditProfile />}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default UserTemplate;
