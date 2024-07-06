import toast from "react-hot-toast";
import { API, AuthAPI, endpoints } from "../Service/ApiConfig";
import {
  loginFail,
  loginStart,
  loginSucces,
  registerFail,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  CommentPostFail,
  CommentPostStart,
  CommentPostSuccess,
  createPostFailed,
  createPostStart,
  createPostSuccess,
  deletePostStart,
  deletePostSuccess,
  deleteReactionPostFailed,
  deleteReactionPostStart,
  deleteReactionPostSuccess,
  getAllPostStart,
  getAllPostSuccess,
  reactPostFailed,
  reactPostStart,
  reactPostSuccess,
} from "./postSlice";
import { updateError, updateStart } from "./userSlice";

export const RegisterUser = async (
  newUser: FormData,
  dispatch: any,
  navigate: any
) => {
  dispatch(registerStart());
  try {
    const res = await API.post(endpoints["register-user"], newUser, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(registerFail());
  }
};

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
    }
  } catch (error) {
    console.log(error);
    toast.error("Can you check password or username");
    dispatch(loginFail());
  }
};

export const updateUser = async (
  newUser: Object,
  dispatch: any,
  access_token: string
) => {
  dispatch(updateStart());
  try {
    const res = await AuthAPI(access_token).put(
      endpoints["current_user"],
      newUser
    );
    dispatch(updateStart(res.data));
  } catch (error) {
    dispatch(updateError());
    console.log(error);
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
      console.log(newPost);

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
export const deletePost = async (
  access_token: string,
  dispatch: any,
  idPost: number
) => {
  dispatch(deletePostStart());

  try {
    const res = await AuthAPI(access_token).delete(
      endpoints.deletePost(idPost)
    );
    if (res.status === 204) {
      dispatch(deletePostSuccess());
      toast.success("Delete post successully");
    } else {
      toast.error("You don't author's post");
    }
  } catch (error) {}
};

export const reactEmojiPost = async (
  postId: number,
  access_token: string,
  dispatch: any,
  react_type: any
) => {
  dispatch(reactPostStart());
  try {
    const res = await AuthAPI(access_token).post(
      endpoints.reactPost(postId),
      react_type
    );
    dispatch(reactPostSuccess(res.data));
  } catch (error) {
    dispatch(reactPostFailed());
    console.log(error);
  }
};

export const deletedPostReaction = async (
  postId: number,
  access_token: string,
  dispatch: any
) => {
  dispatch(deleteReactionPostStart());
  try {
    const res = await AuthAPI(access_token).delete(
      endpoints.deleteReaction(postId)
    );
    dispatch(deleteReactionPostSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(deleteReactionPostFailed());
  }
};

export const commentPost = async (
  postId: number,
  access_token: string,
  newComment: any,
  dispatch: any
) => {
  dispatch(CommentPostStart());
  try {
    const res = await AuthAPI(access_token).post(
      endpoints["comment-post"](postId),
      newComment
    );
    dispatch(CommentPostSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(CommentPostFail());
  }
};
