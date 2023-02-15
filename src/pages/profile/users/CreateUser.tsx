import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import { updateErrorMessageReducer } from "../../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import { createNewUserApi } from "../../../redux/userReducer/userReducer";
import { EditingUserConfig, registerInputData } from "../../../util/config";
import { UserInfoType } from "../../../util/interface/userReducerInterface";

type Props = {};

const newUser: UserInfoType = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  soDT: "",
  maLoaiNguoiDung: "GV",
  maNhom: "GP01",
  email: "",
};

const CreateUser = (props: Props) => {
  const { toggle } = useModal();
  const { errorMessage } = useSelector(
    (store: ReduxRootType) => store.pageReducer
  );
  const dispatch: DispatchType = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoType>({
    mode: "onChange",
    defaultValues: newUser,
  });
  const submitHandle = (data: UserInfoType) => {
    dispatch(updateErrorMessageReducer(null));
    dispatch(createNewUserApi(data));
  };
  useEffect(() => {
    return () => {
      dispatch(updateErrorMessageReducer(null));
    };
  }, []);
  const html = (
    <form onSubmit={handleSubmit(submitHandle)}>
      {Object.keys(newUser).map((item: string): JSX.Element | null => {
        if (item === "maNhom") return null;
        return (
          <div className="profile_main_info_item" key={item}>
            <div className="profile_main_info_item_title">
              <i
                className={`fa fa-${
                  item === "soDT"
                    ? EditingUserConfig.icon[
                        EditingUserConfig.key.indexOf("soDt")
                      ]
                    : EditingUserConfig.icon[
                        EditingUserConfig.key.indexOf(
                          item as keyof UserInfoType
                        )
                      ]
                }`}
              ></i>
              {item === "soDT"
                ? EditingUserConfig.title[EditingUserConfig.key.indexOf("soDt")]
                : EditingUserConfig.title[
                    EditingUserConfig.key.indexOf(item as keyof UserInfoType)
                  ]}
            </div>
            <div className="profile_main_info_item_input">
              {item === "maLoaiNguoiDung" ? (
                <select {...register(item)}>
                  <option value="GV">Giáo vụ</option>
                  <option value="HV">Học viên</option>
                </select>
              ) : (
                <input
                  type={item === "matKhau" ? "password" : "text"}
                  className={
                    errors[item as keyof UserInfoType]?.message
                      ? "isInvalid"
                      : ""
                  }
                  {...register(item as keyof UserInfoType, {
                    required: "Không được để trống!",
                    pattern: {
                      value: new RegExp(
                        registerInputData.regex[
                          registerInputData.id.indexOf(item)
                        ]
                      ),

                      message:
                        registerInputData.errors[
                          registerInputData.id.indexOf(item)
                        ],
                    },
                  })}
                />
              )}
            </div>
            {errors[item as keyof UserInfoType]?.message && (
              <div className="profile_main_info_error">
                <>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors[item as keyof UserInfoType]?.message}
                </>
              </div>
            )}
          </div>
        );
      })}
      {errorMessage && (
        <div className="profile_main_info_item">
          <span className="btn btn-danger">{errorMessage}</span>
        </div>
      )}

      <div className="profile_main_info_item">
        <button className="btn btn-primary">Thêm người dùng</button>
      </div>
    </form>
  );
  return (
    <Modal title="Tạo user mới" show={true} toggle={toggle}>
      {html}
    </Modal>
  );
};

export default CreateUser;
