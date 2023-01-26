import { useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../util/function";
import { UserInfoType } from "../util/interface/userReducerInterface";

const useToken = () => {
  const [token, setToken] = useState<string>(
    getLocalStorage("userInfo")?.accessToken
  );
  const saveToken = (data: UserInfoType): void =>
    saveLocalStorage<UserInfoType>("userInfo", data);
  return { token, setToken: saveToken };
};

export default useToken;
