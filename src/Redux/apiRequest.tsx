import { API, endpoints } from "../Service/ApiConfig";
import { loginFail, loginStart, loginSucces } from "./authSlice";

export const LoginUser = async (newUser: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await API.post(endpoints["login"], newUser);
    if (res.status === 200) dispatch(loginSucces(res.data));
    else navigate("/login");
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(loginFail());
  }
};
