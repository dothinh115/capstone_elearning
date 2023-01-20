import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../App";
import { API } from "../../util/config";
import { saveLocalStorage } from "../../util/function";
import {
  LoginType,
  RegisterInputType,
  UserInfoStateType,
  UserInfoType,
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
    loginAction: (
      state: UserInfoStateType,
      action: PayloadAction<UserInfoType>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { loginAction } = userReducer.actions;

export default userReducer.reducer;

/************Async Action**********/

export const loginApi = (dataLogin: LoginType) => {
  return async (dispatch: DispatchType) => {
    const setLoading: PayloadAction<boolean> = setLoadingAction(true);
    dispatch(setLoading);
    try {
      const result = await API.post("/QuanLyNguoiDung/DangNhap", dataLogin);
      const userInfoApi = loginAction(result.data);
      dispatch(userInfoApi);
      saveLocalStorage<UserInfoType>("userInfo", result.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      const setLoading: PayloadAction<Boolean> = setLoadingAction(false);
      dispatch(setLoading);
    }
  };
};

export const registerApi = (dataRegister: RegisterInputType) => {
  return async () => {
    try {
      const result = await API.post("/QuanLyNguoiDung/DangKy", dataRegister);
      console.log(result);
    } catch (error: any) {
      console.log(error);
      history.push(window.location.pathname, {
        errorMessage: error.response.data,
      });
    }
  };
};
