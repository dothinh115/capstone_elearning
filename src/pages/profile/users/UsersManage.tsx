import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import { DispatchType } from "../../../redux/store";
import { getAllUserListApi } from "../../../redux/userReducer/userReducer";

type Props = {};

const UsersManage = (props: Props) => {
  const { toggle } = useModal();
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(getAllUserListApi);
  }, []);

  const html = (
    <div className="profile_main_info">
      <div className="profile_container_main_block">
        <Link to="/profile/users_manage/create" className="btn">
          Thêm học viên mới
        </Link>
      </div>
      <div className="profile_container_`ma`in_block">
        <form className="profile_main_info_search">
          <input type="text" placeholder="Tìm kiếm" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="profile_container_main_block"></div>
    </div>
  );

  if (window.innerWidth <= 600)
    return (
      <Modal show={true} toggle={toggle} title="Quản lý học viên">
        {html}
      </Modal>
    );
  return html;
};

export default UsersManage;
