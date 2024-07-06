import React, { useEffect, useState } from "react";
import { CreatePost } from "../../Components/Post/CreatePost";
import { Post } from "../../Components/Post/Post";
import { PostStory } from "../../Components/Post/PostStory";
import { useIsMobile } from "../../Hook/useIsMobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import {
  getUserSucess,
  updateError,
  updateStart,
  updateSuccess,
} from "../../Redux/userSlice";

export const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const [refreshPosts, setRefreshPosts] = useState(false);
  const accessToken = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      dispatch(updateStart());
      try {
        const res = await AuthAPI(accessToken?.access_token).get(
          endpoints["current_user"]
        );
        dispatch(getUserSucess(res.data));
        dispatch(updateSuccess(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
        dispatch(updateError());
      }
    };
    getUser();
  }, [accessToken?.access_token, dispatch]);

  return (
    <div className="md:w-[1120px] md:ml-[100px] md:px-2 md:pt-2">
      {isMobile && <CreatePost setRefreshPosts={setRefreshPosts} />}
      <PostStory />
      {!isMobile && <CreatePost setRefreshPosts={setRefreshPosts} />}
      <Post refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts} />
    </div>
  );
};
