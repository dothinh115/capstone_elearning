import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../App";
import { API, registerSuccessMess } from "../../util/config";
import { getLocalStorage, saveLocalStorage } from "../../util/function";
import {
  dataGhiDanh,
  LoginType,
  RegisterInputType,
  UserInfoStateType,
  UserInfoType,
  UserListType,
  UserLoginType,
} from "../../util/interface/userReducerInterface";
import {
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../pageReducer/pageReducer";
import { DispatchType } from "../store";

const initialState: UserInfoStateType = {
  userInfo: null,
  loading: false,
  userList: null,
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
    setLoadingAction: (
      state: UserInfoStateType,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    getUserListReducer: (
      state: UserInfoStateType,
      action: PayloadAction<UserListType[] | null>
    ) => {
      state.userList = action.payload;
    },
  },
});

export const { setUserInfoAction, setLoadingAction, getUserListReducer } =
  userReducer.actions;

export default userReducer.reducer;

/************Async Action**********/

export const loginApi = (dataLogin: LoginType, next: string) => {
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      const result = await API.post("/QuanLyNguoiDung/DangNhap", dataLogin);
      saveLocalStorage<UserLoginType>("userInfo", result.data);
      window.location.href = next;
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname + window.location.search, {
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
  if (!getLocalStorage("userInfo")?.accessToken) return;
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

export const dangKyApi = (bool: boolean, data: dataGhiDanh) => {
  //false: hủy đăng ký, true: đăng ký
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      await API.post(
        `/QuanLyKhoaHoc/${bool ? "DangKyKhoaHoc" : "HuyGhiDanh"}`,
        data
      );
      await dispatch(getUserInfoApi);
    } catch (error) {
      console.log(error);
    } finally {
      const setLoading: PayloadAction<boolean> = setLoadingAction(false);
      dispatch(setLoading);
    }
  };
};

export const updateUserInfoApi = (data: UserInfoType) => {
  return async (dispatch: DispatchType) => {
    try {
      await API.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
      dispatch(getUserInfoApi);
      dispatch(updateSuccessMessageReducer("Thay đổi thông tin thành công!"));
    } catch (error: any) {
      console.log(error);
      dispatch(updateErrorMessageReducer(error.response.data));
    }
  };
};

export const getAllUserListApi = async (dispatch: DispatchType) => {
  try {
    const result = await API.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
    const resultAction: PayloadAction<UserListType[] | null> =
      getUserListReducer(result.data);
    dispatch(resultAction);
  } catch (error) {
    console.log(error);
  }
};
