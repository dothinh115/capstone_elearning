import React from "react";
import Mainblock from "../../components/Mainblock";

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <Mainblock
        value="Nếu chưa có Tài khoản, hãy đăng ký!"
        icon="fa-arrow-right"
      />

      <Mainblock value="Đăng nhập thất bại" icon="fa-xmark" iconColor="red" />

      <Mainblock headerContent="Đăng nhập" value="Form đăng nhập ở đây" />
    </>
  );
};

export default Login;
