import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const Profile = (props: Props) => {
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
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-house"></i>Thông tin tài khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-key"></i>Đổi mật khẩu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/thongtin">
                    <i className="fa-solid fa-desktop"></i>Khóa học đã ghi danh
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
            <div className="profile_container_main_block">
              <div className="profile_container_main_block_item">
                <div className="profile_container_main_block_item_title">
                  <i className="fa-regular fa-id-card"></i>
                  ID:
                </div>
                <div className="profile_container_main_block_item_input">
                  <input type="text" />
                </div>
              </div>
              <div className="profile_container_main_block_item">
                <div className="profile_container_main_block_item_title">
                  <i className="fa-solid fa-key"></i>
                  Password:
                </div>
                <div className="profile_container_main_block_item_input">
                  <input type="text" />
                </div>
              </div>
              <div className="profile_container_main_block_item">
                <div className="profile_container_main_block_item_title">
                  <i className="fa-solid fa-signature"></i>
                  Họ tên:
                </div>
                <div className="profile_container_main_block_item_input">
                  <input type="text" />
                </div>
              </div>
              <div className="profile_container_main_block_item">
                <div className="profile_container_main_block_item_title">
                  <i className="fa-solid fa-phone"></i>
                  Số điện thoại:
                </div>
                <div className="profile_container_main_block_item_input">
                  <input type="text" />
                </div>
              </div>
              <div className="profile_container_main_block_item">
                <div className="profile_container_main_block_item_title">
                  <i className="fa-solid fa-envelope"></i>
                  Email:
                </div>
                <div className="profile_container_main_block_item_input">
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="profile_container_main_block">
              <div className="profile_container_main_block_button">
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
