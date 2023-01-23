import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const Profile = (props: Props) => {
  return (
    <>
      <section className="profile">
        <div className="profile_container">
          <NavLink id="getout" to="/">
            <i className="fa-solid fa-x"></i>
          </NavLink>
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
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-arrow-right"></i>Thông tin tài
                    khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-arrow-right"></i>Đổi mật khẩu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-arrow-right"></i>Khóa học đã ghi
                    danh
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
          <div className="profile_container_main">Nội dung hiển thị ở đây</div>
        </div>
      </section>
    </>
  );
};

export default Profile;
