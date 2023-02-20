import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";

type Props = {};

const Error500Message = (props: Props) => {
  const { state } = useLocation();
  const { toggle } = useModal();
  if (state?.error)
    return (
      <Modal title="Thông báo" show={true} toggle={toggle}>
        <>API lỗi, bị block khỏi CORS trong 1 số trường hợp.</>
      </Modal>
    );
  return <Outlet />;
};

export default Error500Message;
