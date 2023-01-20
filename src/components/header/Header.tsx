import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { ReduxRootType } from "../../redux/store";
type Props = {};

const Header = (props: Props) => {
  const { token } = useToken();
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  return (
    <section className="header">
      <nav className="header_container">
        <div className="header-logo">
          <NavLink to="/">
            <img src="../../img/logo.png" alt="" />
          </NavLink>
        </div>
        <div className="header-menu">
          <ul>
            {token ? (
              <>
                <NavLink to="/profile">{userInfo?.hoTen}</NavLink>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register">
                    <i className="fa-solid fa-user"></i>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Header;
