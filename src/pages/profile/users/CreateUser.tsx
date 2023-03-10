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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <option value="GV">Gi??o v???</option>
                  <option value="HV">H???c vi??n</option>
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
                    required: "Kh??ng ???????c ????? tr???ng!",
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
                  placeholder={
                    item === "matKhau"
                      ? "??t nh???t 1 k?? t??? hoa, th?????ng, s??? v?? k?? t??? ?????c bi???t!"
                      : item === "soDT"
                      ? EditingUserConfig.title[
                          EditingUserConfig.key.indexOf("soDt")
                        ]
                      : EditingUserConfig.title[
                          EditingUserConfig.key.indexOf(
                            item as keyof UserInfoType
                          )
                        ]
                  }
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
        <button className="btn btn-primary">Th??m ng?????i d??ng</button>
      </div>
    </form>
  );
  return (
    <Modal title="T???o user m???i" show={true} toggle={toggle}>
      {html}
    </Modal>
  );
};

export default CreateUser;
