import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { updateUserInfoApi } from "../../redux/userReducer/userReducer";
import { registerInputData } from "../../util/config";
import { showMaNhom } from "../../util/function";
import {
  RegisterInputType,
  UserInfoType,
} from "../../util/interface/userReducerInterface";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import {
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../../redux/pageReducer/pageReducer";

type Props = {};

const EditProfile = (props: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { state } = useLocation();
  const dispatch: DispatchType = useDispatch();
  const [editing, setEditing] = useState<boolean>(false);
  const { toggle } = useModal();
  const { successMessage, errorMessage } = useSelector(
    (store: ReduxRootType) => store.pageReducer
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfoType>({
    mode: "onChange",
    defaultValues: { ...userInfo, maLoaiNguoiDung: userInfo?.maLoaiNguoiDung },
  });

  const submitHandle = (data: UserInfoType) => {
    if (!editing) {
      setEditing(true);
      dispatch(updateErrorMessageReducer(null));
      dispatch(updateSuccessMessageReducer(null));
    } else {
      dispatch(updateUserInfoApi(data));
    }
  };

  useEffect(() => {
    reset({ ...userInfo, maLoaiNguoiDung: userInfo?.maLoaiNguoiDung });
    if (!state?.errorMess) setEditing(false);
  }, [userInfo]);

  useEffect(() => {
    return () => {
      dispatch(updateErrorMessageReducer(null));
      dispatch(updateSuccessMessageReducer(null));
    };
  }, []);

  const html = (
    <div className="profile_main_info">
      <h1>CHỈNH SỬA THÔNG TIN CÁ NHÂN</h1>
      <form onSubmit={handleSubmit(submitHandle)}>
        {registerInputData.id.map((item: string | any, index: number) => {
          if (item === "matKhau") return false;
          const reg = new RegExp(registerInputData.regex[index]);
          return (
            <div className="profile_container_main_block" key={index}>
              <div className="profile_main_info_item edit_profile">
                <div className="profile_main_info_item_title">
                  <>
                    <div>
                      <i
                        className={`fa fa-${registerInputData.icon[index]}`}
                      ></i>
                      {registerInputData.title[index]}:
                    </div>
                  </>
                </div>
                <div className="profile_main_info_item_input">
                  <>
                    {editing && (
                      <>
                        {item === "maNhom" || item === "maLoaiNguoiDung" ? (
                          <select {...register(item)}>
                            {item === "maNhom" &&
                              showMaNhom().map((val: JSX.Element) => {
                                return val;
                              })}
                            {item === "maLoaiNguoiDung" && (
                              <>
                                <option value="GV" key={1}>
                                  GV
                                </option>
                                <option value="HV">HV</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <input
                            type={`${
                              (item === "soDT" && "number") ||
                              (item === "email" && "email")
                            }`}
                            {...register(item, {
                              required: `${registerInputData.title[index]} không được để trống!`,
                              pattern: {
                                value: reg,
                                message: registerInputData.errors[index],
                              },
                            })}
                            placeholder={registerInputData.placeHolder[index]}
                          />
                        )}
                      </>
                    )}
                    {!editing && userInfo !== null
                      ? userInfo[item as keyof UserInfoType]
                      : ""}
                  </>
                </div>
                {errors[item as keyof RegisterInputType]?.message && (
                  <div className="profile_main_info_error">
                    <p>
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors[item as keyof RegisterInputType]?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {(errorMessage || successMessage) && (
          <div className="profile_container_main_block">
            <p
              className={`show_result ${
                (errorMessage && "errors") || (successMessage && "success")
              }`}
            >
              <i
                className={`fa-solid fa-${
                  (errorMessage && "circle-exclamation fa-sharp") ||
                  (successMessage && "check")
                }`}
              ></i>
              {errorMessage}
              {successMessage}
            </p>
          </div>
        )}

        <div className="profile_container_main_block">
          <div className="profile_container_main_block_button">
            <button className="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
  if (window.innerWidth <= 600) {
    return (
      <Modal show={true} toggle={toggle} title="Chỉnh sửa thông tin cá nhân">
        {html}
      </Modal>
    );
  }
  return html;
};

export default EditProfile;
