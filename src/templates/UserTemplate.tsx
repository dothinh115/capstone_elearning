import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";
import { DispatchType, ReduxRootType } from "../redux/store";
import { removeLocalStorage } from "../util/function";
import { useEffect } from "react";
import { limitProfileCoursesView, profileMenuConfig } from "../util/config";
import {
  setCoursesManageScroll,
  setCoursesViewNumber,
  setRegisteredCoursesScroll,
  setRegisteredCoursesViewNumber,
} from "../redux/profileReducer/profileReducer";

const UserTemplate = () => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { prevPage } = useSelector((store: ReduxRootType) => store.pageReducer);
  const { show, toggle } = useModal();
  const dispatch: DispatchType = useDispatch();
  const { pathname } = useLocation();
  const logout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    removeLocalStorage("userInfo");
    window.location.href = "/";
  };

  const showModal = (): void => {
    if (window.innerWidth <= 600) toggle();
    dispatch(setCoursesManageScroll(0));
    dispatch(setRegisteredCoursesScroll(0));
    dispatch(setCoursesViewNumber(limitProfileCoursesView));
    dispatch(setRegisteredCoursesViewNumber(limitProfileCoursesView));
  };

  useEffect(() => {
    for (let i in profileMenuConfig.modalPopup) {
      if (
        pathname === profileMenuConfig.path[i] &&
        profileMenuConfig.modalPopup[i]
      )
        toggle();
    }
  }, []);

  return (
    <section className="profile">
      <div className="profile_container">
        <div className="profile_container_header">
          <NavLink id="getout" to={prevPage} className="btn btn-primary">
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
                    <NavLink to={item} onClick={showModal}>
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
          {window.innerWidth <= 600 ? (
            <Modal
              show={show}
              toggle={toggle}
              title={
                profileMenuConfig.title[
                  profileMenuConfig.path.indexOf(pathname)
                ]
              }
            >
              <Outlet />
            </Modal>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </section>
  );
};

export default UserTemplate;
