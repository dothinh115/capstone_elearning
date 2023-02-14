import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { history } from "../App";
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";
import { ReduxRootType } from "../redux/store";

type Props = {};

const AdminRoute = (props: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { toggle } = useModal();
  if (userInfo?.maLoaiNguoiDung !== "GV") {
    return (
      <Modal title="Thông báo" show={true} toggle={toggle}>
        <span className="btn btn-info">
          Chỉ có tài khoản GV mới có thể thực hiện thao tác này!
        </span>
      </Modal>
    );
  }
  return <Outlet />;
};

export default AdminRoute;
