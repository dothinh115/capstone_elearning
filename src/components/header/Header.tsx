import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { ReduxRootType } from "../../redux/store";
import { removeLocalStorage } from "../../util/function";
type Props = {};

const Header = (props: Props) => {
  const { token } = useToken();
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const dropdownMenu = useRef<HTMLDivElement | null>(null);
  const dropdownButton = useRef<HTMLButtonElement | null>(null);
  const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeLocalStorage("userInfo");
    window.location.reload();
  };
  const dropdownClickHandle = (event: any) => {
    if (
      event.target.parentNode === dropdownButton.current ||
      event.target === dropdownButton.current
    ) {
      dropdownMenu.current?.classList.contains("hide")
        ? (dropdownMenu.current.className = "menu_dropdown show")
        : (dropdownMenu.current!.className = "menu_dropdown hide");
    } else {
      if (dropdownMenu.current?.classList.contains("show"))
        dropdownMenu.current!.className = "menu_dropdown hide";
    }
  };
  useEffect(() => {
    document.addEventListener("click", dropdownClickHandle);
  }, []);
  return (
    <section className="header">
      <nav className="header_container">
        <div className="header-logo">
          <NavLink to="/">
            <img src="../../img/logo.png" alt="" />
          </NavLink>
        </div>
        <div className="header_menu">
          <ul>
            <li>
              <button id="header_icon" ref={dropdownButton}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div ref={dropdownMenu} className={`menu_dropdown hide`}>
                <ul>
                  <li>
                    <NavLink to="/categories">
                      <i className="fa-solid fa-list"></i>Danh mục khóa học
                    </NavLink>
                  </li>
                  {token ? (
                    <>
                      <li>
                        <NavLink to="/profile">
                          <i className="fa-solid fa-magnifying-glass"></i>
                          Trang cá nhân
                        </NavLink>
                      </li>
                      <li>
                        <a href="#" onClick={logout}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                          Thoát
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/login">
                          <i className="fa-solid fa-right-to-bracket"></i>
                          Đăng nhập
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/register">
                          <i className="fa-solid fa-user"></i>
                          Đăng ký
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Header;
