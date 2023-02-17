import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <section className="header">
      <div className="doatest">
        <div className="header_container">
          đang phân vân không biết chọn khóa học gì? Hãy thử làm bài trắc nghiệm
          sau
          <button>Nhấn vào đây</button>
        </div>
      </div>
      <nav>
        <div className="header_container">
          <div className="logo">
            <img src="../img/logo1.png" alt="" />
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/">Tin tức</Link>
              </li>
              <li>
                <Link to="/">Khóa học</Link>
              </li>
              <li>
                <Link to="/">Hỗ trợ</Link>
              </li>
              <li>
                <Link to="/">Phòng trưng bày</Link>
              </li>
            </ul>
          </div>
          <div className="header_icon">
            <button id="header_icon">
              <i className="fa-solid fa-user"></i>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
