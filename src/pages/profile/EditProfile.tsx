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
import { history } from "../../App";

type Props = {};

const EditProfile = (props: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { state } = useLocation();
  const dispatch: DispatchType = useDispatch();
  const [editing, setEditing] = useState<boolean>(false);

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
      history.push(window.location.pathname);
    } else {
      dispatch(updateUserInfoApi(data));
    }
  };

  useEffect(() => {
    reset({ ...userInfo, maLoaiNguoiDung: userInfo?.maLoaiNguoiDung });
    if (!state?.errorMess) setEditing(false);
  }, [userInfo]);

  return (
    <form onSubmit={handleSubmit(submitHandle)}>
      <div className="profile_container_main_block">
        {registerInputData.id.map((item: string | any, index: number) => {
          if (item === "matKhau") return false;
          const reg = new RegExp(registerInputData.regex[index]);
          return (
            <div
              style={{ marginBottom: !editing ? "30px" : "" }}
              className="profile_container_main_block_item"
              key={index}
            >
              <div
                className="profile_container_main_block_item_title"
                style={{
                  display: !editing ? "flex" : "block",
                  justifyContent: !editing ? "space-between" : "",
                }}
              >
                <>
                  <span>
                    <i className={`fa fa-${registerInputData.icon[index]}`}></i>
                    {registerInputData.title[index]}:
                  </span>
                  <span>
                    {!editing && userInfo !== null
                      ? userInfo[item as keyof UserInfoType]
                      : ""}
                  </span>
                </>
              </div>
              <div className="profile_container_main_block_item_input">
                <>
                  {editing && (
                    <>
                      {item === "maNhom" ? (
                        <select {...register(item)}>
                          {showMaNhom().map((val: JSX.Element) => {
                            return val;
                          })}
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
                </>
              </div>
              {errors[item as keyof RegisterInputType]?.message && (
                <div className="profile_container_main_block_item_error">
                  <p>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors[item as keyof RegisterInputType]?.message}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {(state?.errorMess || state?.successMess) && (
        <div className="profile_container_main_block">
          <p
            className={`show_result ${
              (state.errorMess && "errors") || (state.successMess && "success")
            }`}
          >
            <i
              className={`fa-solid fa-${
                (state.errorMess && "circle-exclamation fa-sharp") ||
                (state.successMess && "check")
              }`}
            ></i>
            {state.errorMess}
            {state.successMess}
          </p>
        </div>
      )}

      <div className="profile_container_main_block">
        <div className="profile_container_main_block_button">
          <button className="btn btn-primary">Update</button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
