import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { IoTrashBinOutline } from "react-icons/io5";
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
import { reactEmojiPost } from "../../Redux/apiRequest";
import { log } from "console";

interface PostProps {
  refreshPosts: boolean;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Post: React.FC<PostProps> = ({
  refreshPosts,
  setRefreshPosts,
}) => {
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
      case "like":
        return <SlLike size={24} />;
      case "love":
        return <FcLike size={24} />;
      case "haha":
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
        ["like", "haha", "love"].includes(reaction.reaction_type)
    );
  };

  const handleReactionClick = async (postId: number, reactType: string) => {
    try {
      await reactEmojiPost(postId, auth?.access_token, dispatch, {
        reaction_type: reactType,
      });
      setRefreshPosts((prev) => !prev);
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  return (
    <section className="md:w-[680px] w-[375px] bg-white mt-2 p-4 shadow rounded-lg">
      {allPost.map((post, index) => (
        <div
          key={index}
          className="w-full mb-4 border rounded-md p-4 hover:bg-[#F9F9F9]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={post?.user?.avatar_user}
                alt="avatar_user"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{post?.user?.username}</p>
                <p className="text-xs text-gray-500">
                  {moment(post.created_at).fromNow()}
                </p>
              </div>
            </div>
            {post.user && post.user.id === user?.id && (
              <div>
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
          <div className="mt-4">
            {post.media_file.length === 0 ? (
              <div className="flex items-center justify-center  bg-gray-200 rounded-md p-4 overflow-hidden">
                <p className="text-lg text-gray-700 break-words overflow-wrap">
                  {post.content}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 mb-4 break-words overflow-wrap">
                  {post.content}
                </p>
                <div
                  className={`grid gap-4 ${
                    post.media_file.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {post.media_file.map((imagePost: string) => (
                    <img
                      src={imagePost}
                      alt="image_post"
                      key={imagePost}
                      className="rounded-md object-cover w-full"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="post_footer flex justify-between items-center gap-2 md:gap-10 mt-4 px-1">
            <Tippy
              interactive={true}
              arrow={true}
              placement="top-end"
              render={(attrs) => (
                <div {...attrs} tabIndex={-1}>
                  <div className="tippy-content">
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
              <button className="p-2 rounded-md flex items-center gap-2 bg-gray-100 hover:bg-gray-200">
                {post.react}
                {hasUserReactedToPost(post.id, user?.id, post.reaction) ? (
                  <>
                    {post.reaction.map((reaction: any) => {
                      return mapReactionToIcon(reaction.reaction_type);
                    })}
                  </>
                ) : (
                  <>
                    <SlLike size={24} />
                  </>
                )}

                <span className="text-sm">
                  {post.reaction.map((title: any) => (
                    <span key={title?.id}>{title?.reaction_type}</span>
                  ))}
                </span>
              </button>
            </Tippy>
            <button className="p-2 rounded-md flex items-center gap-2 bg-gray-100 hover:bg-gray-200">
              <span className="text-sm">Comment</span>
              <span className="text-sm">2</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
