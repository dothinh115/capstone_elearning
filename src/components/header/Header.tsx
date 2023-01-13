import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <section className="header">
      <nav>
        <div className="header-logo">
          <NavLink to="/">
            <img src="./img/logo.png" alt="" />
          </NavLink>
        </div>
        <div className="header-menu">
          <ul>
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
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Header;
