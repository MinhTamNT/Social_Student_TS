import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { IoTrashBinOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { reactEmojiPost } from "../../Redux/apiRequest";
import moment from "moment";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import { SlLike } from "react-icons/sl";
import { FacebookSelector } from "@charkour/react-reactions";
import { FcLike } from "react-icons/fc";
import { FaRegFaceLaughSquint } from "react-icons/fa6";

import { ModalDeletedPost } from "../Modal/ModalDeletedPost";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";

export const Post = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [allPost, setAllPost] = useState<any[]>([]);

  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const dispatch = useDispatch();

  const handlerModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await AuthAPI(auth?.access_token).get(
          endpoints["all_post"]
        );
        setAllPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [refreshPosts]);

  const mapReactionToIcon = (reactionType: string) => {
    switch (reactionType) {
      case "Like":
        return <SlLike size={24} />;
      case "Love":
        return <FcLike size={24} />;
      case "Haha":
        return <FaRegFaceLaughSquint size={24} color="#f78e36" />;
      default:
        return null;
    }
  };

  const hasUserReactedToPost = (
    _postId: number,
    userId: number,
    reactions: any[]
  ) => {
    return reactions.some(
      (reaction: any) =>
        reaction.user_id === userId &&
        (reaction.reaction_type === "Like" ||
          reaction.reaction_type === "Haha" ||
          reaction.reaction_type === "Heart")
    );
  };

  const handleReactionClick = async (postId: number, reactType: string) => {
    try {
      await reactEmojiPost(postId, auth?.access_token, dispatch, {
        reaction_type: reactType,
      });
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  return (
    <section className="md:w-[680px] w-full  bg-white h-auto mt-2">
      {allPost.map((post, index) => (
        <div
          key={index}
          className="h-full w-full  mb-4 border rounded-md p-2 hover:bg-[#EEEEEE]"
        >
          <div className="post_header flex items-center justify-between gap-2 ">
            <div className="flex gap-2">
              <img
                src={post?.user?.avatar_user}
                alt="avatar_user"
                className="w-10 h-10 rounded-full"
              />
              <div className="info_user_post w-27 flex flex-col">
                <p className="text-13">{post?.user?.username}</p>
                <p className="text-13">{moment(post.created_at).fromNow()}</p>
              </div>
            </div>
            {post.user && post.user.id === user?.id && (
              <div className="header_action">
                <button onClick={handlerModal}>
                  <IoTrashBinOutline size={24} color="red" />
                </button>
              </div>
            )}
            <ModalDeletedPost
              isOpenModal={isOpenModal}
              postId={post?.id}
              accessToken={auth?.access_token}
              setOpenModal={setIsOpenModal}
              setRefreshPosts={setRefreshPosts}
              refreshPosts={refreshPosts}
            />
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
                  {post.media_file.map((imagePost: string) => (
                    <img
                      src={imagePost}
                      alt="image_post"
                      key={imagePost}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="post_footer flex justify-between items-center gap-10 mt-2 px-1">
            <Tippy
              interactive={true}
              arrow={true}
              placement="top-end"
              render={(attrs) => (
                <div {...attrs} tabIndex={-1}>
                  <div className="tippy-content ">
                    <FacebookSelector
                      reactions={["like", "love", "haha"]}
                      onSelect={(reaction) =>
                        handleReactionClick(post.id, reaction)
                      }
                    />
                  </div>
                </div>
              )}
            >
              <button className=" p-2 rounded-md flex items-center gap-2">
                {hasUserReactedToPost(post.id, user?.id, post.reaction) ? (
                  <>
                    {mapReactionToIcon(
                      post.reaction.find(
                        (reaction: any) => reaction?.user_id === user?.id
                      )?.reaction_type
                    )}
                  </>
                ) : (
                  <>
                    <SlLike size={24} />
                  </>
                )}
                {post.reaction.map((title: any) => (
                  <span key={title?.id}>{title?.reaction_type}</span>
                ))}
              </button>
            </Tippy>
            <button className=" p-2 rounded-md flex items-center gap-2">
              <span>Comment</span>
              <span>2</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
