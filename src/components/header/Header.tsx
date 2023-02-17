import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { updatePrevPageRecuder } from "../../redux/pageReducer/pageReducer";
import { DispatchType } from "../../redux/store";
import { removeLocalStorage } from "../../util/function";

type Props = {};

const Header = (props: Props) => {
  const dropdownButton = useRef<HTMLButtonElement | null>(null);
  const dropdownMenu = useRef<HTMLDivElement | null>(null);
  const { pathname, search } = useLocation();
  const { token } = useToken();
  const dispatch: DispatchType = useDispatch();
  const logout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    removeLocalStorage("userInfo");
    window.location.reload();
  };
  const dropdownClickHandle = (event: any): void => {
    if (
      event.target.parentNode === dropdownButton.current ||
      event.target === dropdownButton.current
    ) {
      dropdownMenu.current!.classList.toggle("show");
    } else {
      if (dropdownMenu.current?.classList.contains("show"))
        dropdownMenu.current!.classList.toggle("show");
    }
  };
  useEffect(() => {
    document.addEventListener("click", dropdownClickHandle);
    return (): void => {
      document.removeEventListener("click", dropdownClickHandle);
    };
  }, []);
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
            <button id="header_icon" ref={dropdownButton}>
              <i className="fa-solid fa-user"></i>
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
                      <NavLink
                        to="/profile"
                        onClick={(): void => {
                          dispatch(
                            updatePrevPageRecuder(
                              window.location.pathname +
                                window.location.search.replace("+", "%2B")
                            )
                          );
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        Trang cá nhân
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={logout} className="logout">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Thoát
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to={`/login?next=${pathname + search}`}>
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
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
