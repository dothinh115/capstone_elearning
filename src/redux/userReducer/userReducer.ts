import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../App";
import { API, registerSuccessMess } from "../../util/config";
import { saveLocalStorage } from "../../util/function";
import {
  dataGhiDanh,
  LoginType,
  RegisterInputType,
  UserInfoStateType,
  UserInfoType,
  UserLoginType,
} from "../../util/interface/userReducerInterface";
import { setLoadingAction } from "../courseReducer/courseReducer";
import { DispatchType } from "../store";

const initialState: UserInfoStateType = {
  userInfo: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserInfoAction: (
      state: UserInfoStateType,
      action: PayloadAction<UserInfoType>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfoAction } = userReducer.actions;

export default userReducer.reducer;

/************Async Action**********/

export const loginApi = (dataLogin: LoginType) => {
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      const result = await API.post("/QuanLyNguoiDung/DangNhap", dataLogin);
      saveLocalStorage<UserLoginType>("userInfo", result.data);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMessage: error.response.data,
      });
    } finally {
      const setLoading: PayloadAction<Boolean> = setLoadingAction(false);
      dispatch(setLoading);
    }
  };
};

export const registerApi = (dataRegister: RegisterInputType) => {
  return async () => {
    try {
      await API.post("/QuanLyNguoiDung/DangKy", dataRegister);
      history.push(window.location.pathname, {
        successMessage: registerSuccessMess,
      });
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMessage: error.response.data,
      });
    }
  };
};

export const getUserInfoApi = async (dispatch: DispatchType) => {
  const setLoading: PayloadAction<boolean> = setLoadingAction(true);
  dispatch(setLoading);
  try {
    const result = await API.post("/QuanLyNguoiDung/ThongTinNguoiDung");
    const userInfoAction: PayloadAction<UserInfoType> = setUserInfoAction(
      result.data
    );
    dispatch(userInfoAction);
  } catch (error) {
    console.log(error);
  } finally {
    const setLoading: PayloadAction<boolean> = setLoadingAction(false);
    dispatch(setLoading);
  }
};

export const ghiDanhApi = (bool: boolean, data: dataGhiDanh) => {
  //false: hủy ghi danh, true: ghi danh
  return async (dispatch: DispatchType) => {
    try {
      await API.post(
        `/QuanLyKhoaHoc/${bool ? "DangKyKhoaHoc" : "HuyGhiDanh"}`,
        data
      );
      dispatch(getUserInfoApi);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserInfoApi = (data: UserInfoType) => {
  return async (dispatch: DispatchType) => {
    try {
      await API.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
      dispatch(getUserInfoApi);
      history.push(window.location.pathname, {
        successMess: "Thay đổi thông tin thành công!",
      });
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMess: error.response.data,
      });
    }
  };
};
