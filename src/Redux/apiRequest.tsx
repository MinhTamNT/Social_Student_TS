import { API, endpoints } from "../Service/ApiConfig";
import { loginFail, loginStart, loginSucces } from "./authSlice";

export const LoginUser = async (newUser: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await API.post(endpoints["login"], newUser);
    dispatch(loginSucces(res.data));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(loginFail());
  }
};
