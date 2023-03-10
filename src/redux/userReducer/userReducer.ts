import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../App";
import { API, registerSuccessMess } from "../../util/config";
import { getLocalStorage, saveLocalStorage } from "../../util/function";
import {
  dataGhiDanh,
  FindedUserInterface,
  LoginType,
  RegisterInputType,
  UserInfoStateType,
  UserInfoType,
  UserListType,
  UserLoginType,
} from "../../util/interface/userReducerInterface";
import {
  updateDeleteResultReducer,
  updateErrorMessageReducer,
  updateGlobalMessageReducer,
  updateSuccessMessageReducer,
} from "../pageReducer/pageReducer";
import { DispatchType } from "../store";

const initialState: UserInfoStateType = {
  userInfo: null,
  loading: false,
  userList: null,
  findedUser: null,
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
    getFindedUserReducer: (
      state: UserInfoStateType,
      action: PayloadAction<FindedUserInterface | null>
    ) => {
      state.findedUser = action.payload;
    },
  },
});

export const {
  setUserInfoAction,
  setLoadingAction,
  getUserListReducer,
  getFindedUserReducer,
} = userReducer.actions;

export default userReducer.reducer;

/************Async Action**********/

export const loginApi = (dataLogin: LoginType, next: string) => {
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      const result = await API.post("/QuanLyNguoiDung/DangNhap", dataLogin);
      saveLocalStorage<UserLoginType>("userInfo", result.data);
      window.location.href = next.replaceAll("+", "%2B");
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
  //false: h???y ????ng k??, true: ????ng k??
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
      dispatch(updateSuccessMessageReducer("Thay ?????i th??ng tin th??nh c??ng!"));
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

export const deleteUserApi = (userID: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userID}`
      );
      await dispatch(getAllUserListApi);
      dispatch(updateDeleteResultReducer(result.data));
    } catch (error: any) {
      console.log(error);
      dispatch(updateGlobalMessageReducer(error.response.data));
    }
  };
};

export const findUserApi = (userID: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.get(
        `/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${userID}`
      );
      const action: PayloadAction<FindedUserInterface | null> =
        getFindedUserReducer(result.data[0]);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewUserApi = (data: UserInfoType) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await API.post("/QuanLyNguoiDung/ThemNguoiDung", data);
      history.push(`/profile/users_manage/${result.data.taiKhoan}`, {
        createSuccess: true,
      });
    } catch (error: any) {
      console.log(error);
      dispatch(updateErrorMessageReducer(error.response.data));
    }
  };
};
