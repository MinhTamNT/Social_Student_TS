import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { deletePost, getAllPost } from "../../Redux/apiRequest";
import moment from "moment";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import { RiDeleteBack2Line } from "react-icons/ri";
import { BiHide } from "react-icons/bi";
export const Post = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const allPosts = useSelector((state: RootState) => state.post.allPosts.posts);
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
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

  const handlerDeletedPost = async (postId: number) => {
    try {
      await deletePost(auth?.access_token, dispatch, postId);
    } catch (error) {
      console.log(error);
    }
  };
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
              <div className="info_user_post flex items-center flex-col">
                <span className="text-16">{post.user?.username}</span>
                <span className="text-13">
                  {moment(post.created_at).fromNow()}
                </span>
              </div>
            </div>
            {post.user.id === user.id && (
              <div className="header_action">
                <Tippy
                  interactive={true}
                  arrow={true}
                  placement="bottom-end"
                  render={(attrs) => (
                    <div {...attrs} tabIndex={-1}>
                      <div className="tippy-content w-[200px] hover:bg-bg-hover bg-white rounded-md p-2 ">
                        <button
                          className="flex items-center gap-2 px-2"
                          onClick={() => handlerDeletedPost(post.id)}
                        >
                          <RiDeleteBack2Line size={24} />
                          <span className="text-xl">Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                >
                  <button>
                    <HiOutlineDotsHorizontal size={32} />
                  </button>
                </Tippy>
              </div>
            )}
          </div>
          <div className="post_content mt-2">
            {post.media_file.length === 0 ? (
              <div className="no-image-content flex items-center justify-center h-[300px] bg-slate-500 rounded-md">
                <p className="text-xl text-white">{post.content}</p>
              </div>
            ) : (
              <>
                <p className="text-13">{post.content}</p>
                <div
                  className={`grid ${
                    post.media_file.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  } gap-4`}
                >
                  {post.media_file.map((imagePost: string, index: number) => (
                    <img
                      src={imagePost}
                      alt="image_post"
                      key={index}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ))}
                </div>
              </>
            )}
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
