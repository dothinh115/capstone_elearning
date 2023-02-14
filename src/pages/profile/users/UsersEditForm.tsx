import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import {
  layDsKhoaHocChoGhiDanh,
  layDsKhoaHocDaGhiDanh,
  layKhoaHocChoXetDuyetAction,
  layKhoaHocDaXetDuyetAction,
  xetDuyetHocVienApi,
} from "../../../redux/courseReducer/courseReducer";
import {
  updateDeleteResultReducer,
  updateGlobalMessageReducer,
} from "../../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import {
  dangKyApi,
  deleteUserApi,
  updateUserInfoApi,
} from "../../../redux/userReducer/userReducer";
import { EditingUserConfig } from "../../../util/config";
import { KhoaHocXetDuyetInterface } from "../../../util/interface/courseReducerInterface";
import {
  dataGhiDanh,
  UserListType,
} from "../../../util/interface/userReducerInterface";

type Props = {};

const UsersEditForm = (props: Props) => {
  const { toggle } = useModal();
  const { userID } = useParams();
  const { userList } = useSelector((store: ReduxRootType) => store.userReducer);
  const { khoaHocChoXetDuyet, khoaHocDaXetDuyet } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );

  const { deleteResult, globalMessage } = useSelector(
    (store: ReduxRootType) => store.pageReducer
  );

  const [editingUserInfo, setEditingUserInfo] = useState<UserListType | null>(
    null
  );
  const dispatch: DispatchType = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserListType>({
    mode: "onChange",
  });

  const deleteUser = (userID: string | undefined) => {
    dispatch(deleteUserApi(userID));
  };

  const submitHandle = (data: any) => {
    // dispatch(updateUserInfoApi(data));
  };

  const registeredUserConfirmHandle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    maKhoaHoc: string
  ) => {
    event.preventDefault();
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userID,
    };
    await dispatch(xetDuyetHocVienApi(data));
    firstLoad();
  };

  const firstLoad = () => {
    dispatch(layDsKhoaHocChoGhiDanh(userID));
    dispatch(layDsKhoaHocDaGhiDanh(userID));
  };

  useEffect(() => {
    const userInfo = userList?.find(
      (item: UserListType) => item.taiKhoan === userID
    );
    if (userInfo) {
      setEditingUserInfo(userInfo);
      reset(userInfo);
    }
  }, [userList]);

  useEffect(() => {
    firstLoad();
  }, [userID]);

  useEffect(() => {
    return () => {
      dispatch(updateDeleteResultReducer(null));
      dispatch(updateGlobalMessageReducer(null));
      dispatch(layKhoaHocDaXetDuyetAction(null));
      dispatch(layKhoaHocChoXetDuyetAction(null));
    };
  }, []);

  const html = (
    <>
      <form onSubmit={handleSubmit(submitHandle)}>
        {editingUserInfo &&
          Object.keys(editingUserInfo).map((item: any): JSX.Element => {
            return (
              <div className="profile_container_main_block" key={item}>
                <div className="profile_main_info_item">
                  <div className="profile_main_info_item_title">
                    <i
                      className={`fa fa-${
                        EditingUserConfig.icon[
                          EditingUserConfig.key.indexOf(
                            item as keyof UserListType
                          )
                        ]
                      }`}
                    ></i>
                    {
                      EditingUserConfig.title[
                        EditingUserConfig.key.indexOf(
                          item as keyof UserListType
                        )
                      ]
                    }
                  </div>
                  <div className="profile_main_info_item_input">
                    <input
                      type="text"
                      {...register(item, {
                        required: "Không được để trống!",
                      })}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
        {globalMessage && (
          <div className="profile_main_info_item">
            <div className="profile_main_info_item_button">
              <span className="btn">{globalMessage}</span>
            </div>
          </div>
        )}
        <div className="profile_main_info_item">
          <div className="profile_main_info_item_button">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteUser(editingUserInfo?.taiKhoan)}
            >
              Xóa
            </button>
          </div>
        </div>
      </form>
      <h2>Danh sách đang xét duyệt</h2>
      <ul className="modal_ul">
        {khoaHocChoXetDuyet ? (
          khoaHocChoXetDuyet?.map(
            (item: KhoaHocXetDuyetInterface, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/course/${item.maKhoaHoc}`}>
                    {item.tenKhoaHoc.length > 25
                      ? item.tenKhoaHoc.substring(0, 24) + "..."
                      : item.tenKhoaHoc}
                  </Link>

                  <span>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) => {
                        registeredUserConfirmHandle(event, item?.maKhoaHoc);
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button type="button" className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </span>
                </li>
              );
            }
          )
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>

      <h2>Danh sách đã xét duyệt</h2>
      <ul className="modal_ul">
        {khoaHocDaXetDuyet ? (
          khoaHocDaXetDuyet?.map(
            (item: KhoaHocXetDuyetInterface, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/course/${item.maKhoaHoc}`}>
                    {item.tenKhoaHoc.length > 25
                      ? item.tenKhoaHoc.substring(0, 24) + "..."
                      : item.tenKhoaHoc}
                  </Link>

                  <span>
                    <button type="button" className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </span>
                </li>
              );
            }
          )
        ) : (
          <li>Danh sách trống</li>
        )}
      </ul>
    </>
  );

  return (
    <Modal toggle={toggle} show={true} title="Chỉnh sửa thông tin học viên">
      {deleteResult ? <span className="btn">{deleteResult}</span> : html}
    </Modal>
  );
};

export default UsersEditForm;
