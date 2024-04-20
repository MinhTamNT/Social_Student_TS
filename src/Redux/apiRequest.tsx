import toast from "react-hot-toast";
import { API, AuthAPI, endpoints } from "../Service/ApiConfig";
import { loginFail, loginStart, loginSucces } from "./authSlice";
import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  getAllPostStart,
  getAllPostSuccess,
} from "./postSlice";

export const LoginUser = async (newUser: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await API.post(endpoints["login"], newUser);
    if (res.status === 200) {
      dispatch(loginSucces(res.data));
      navigate("/");
      setTimeout(() => {
        toast.success("Login successfully");
      }, 3000);
    } else {
      toast.error("Can you check password or username");
    }
  } catch (error) {
    console.log(error);
    dispatch(loginFail());
  }
};
export const createPost = async (
  access_token: string,
  newPost: any,
  dispatch: any
) => {
  try {
    dispatch(createPostStart());
    const res = await AuthAPI(access_token).post(
      endpoints["create_post"],
      newPost
    );

    if (res.status === 201) {
      dispatch(createPostSuccess(res.data));
      toast.success("create the post successully");
    } else {
      toast.error("Can you check again content your the post");
      dispatch(createPostFailed());
    }
  } catch (error) {
    console.log(error);
    toast.error("Đã xảy ra lỗi khi tạo bài viết");
    dispatch(createPostFailed());
  }
};
export const getAllPost = async (access_token: string, dispatch: any) => {
  dispatch(getAllPostStart());
  try {
    const res = await AuthAPI(access_token).get(endpoints["all_post"]);
    dispatch(getAllPostSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
