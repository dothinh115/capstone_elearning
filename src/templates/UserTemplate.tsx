import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { ReduxRootType } from "../redux/store";
import { removeLocalStorage } from "../util/function";

const UserTemplate = () => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const logout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    removeLocalStorage("userInfo");
    window.location.reload();
  };
  return (
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
                <NavLink to="/profile/registered_courses">
                  <i className="fa-solid fa-key"></i>Khóa học đã đăng ký
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/courses_manage">
                  <i className="fa-solid fa-list-check"></i>
                  Quản lý khóa học
                </NavLink>
              </li>
              <li>
                <button onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile_container_main">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default UserTemplate;
