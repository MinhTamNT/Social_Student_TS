import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { getAllPost } from "../../Redux/apiRequest";
export const Post = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const allPosts = useSelector((state: RootState) => state.post.allPosts.posts);
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const dispatch = useDispatch();

  const memoizedGetAllPost = useCallback(() => {
    getAllPost(auth?.access_token, dispatch);
  }, [dispatch, auth]);

  useEffect(() => {
    memoizedGetAllPost();
  }, [memoizedGetAllPost, refreshPosts]);

  return (
    <section className="md:w-[680px] w-[372px] h-auto mt-2">
      {allPosts?.map((post, index) => (
        <div
          key={index}
          className="h-full w-full  mb-4 border rounded-md p-2 hover:bg-[#EEEEEE]"
        >
          <div className="post_header flex items-center justify-between gap-2 ">
            <div className="flex gap-2">
              <img
                src={post.user?.avatar_user}
                alt="avatar_user"
                className="w-10 h-10 rounded-full"
              />
              <div className="info_user_post flex flex-col">
                <span className="text-16">{post.author}</span>
                <span className="text-13"></span>
              </div>
            </div>
            <div className="header_action">
              <button>
                <HiOutlineDotsHorizontal size={32} />
              </button>
            </div>
          </div>
          <div className="post_content">
            <p className="text-13">{post.content}</p>
            {post?.media_file?.map((imagePost: string, index: number) => (
              <img src={imagePost} alt="image_post" key={index} />
            ))}
          </div>
          <div className="post_footer flex items-center gap-10 mt-2 px-1">
            <button className=" p-2 rounded-md flex items-center gap-2">
              <AiFillLike size={24} />
              <span>6</span>
            </button>
            <button className=" p-2 rounded-md flex items-center gap-2">
              <FaRegComment size={24} />
              <span>6</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
