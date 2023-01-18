import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  return (
    <section className="login">
      <div className="login_header">
        <h1>Đăng nhập</h1>
        <Link to="/" className="badge">
          <i className="fa-solid fa-x"></i>
        </Link>
      </div>

      <div className="login_container">
        <form>
          <div className="item">
            <div className="item_title">
              <i className="fa-solid fa-envelope"></i>Email:
            </div>
            <div className="item_input">
              <input type="text" />
            </div>
          </div>
          <div className="item">
            <div className="item_title">
              <i className="fa-solid fa-lock"></i>Password:
            </div>
            <div className="item_input">
              <input type="text" />
            </div>
          </div>
          <div className="item_btn">
            <button className="btn btn-primary">Đăng nhập</button>
          </div>
        </form>
      </div>
      <div className="login_footer">
        <div className="hr_span_footer">
          <span>Hoặc</span>
          <div>
            <button className="btn">Đăng ký</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
