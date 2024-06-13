import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import { SlLike } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { ModalDeletedPost } from "../Modal/ModalDeletedPost";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import { reactEmojiPost } from "../../Redux/apiRequest";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import ReactionSelector from "./ReactionPost";
import ModalPostDetail from "../Modal/ModaLPostDetail";
import { IoTrashBinOutline } from "react-icons/io5";
interface PostProps {
  refreshPosts: boolean;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Post: React.FC<PostProps> = ({
  refreshPosts,
  setRefreshPosts,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelatil, setIsOpenModalDelatil] = useState<boolean>(false);
  const [allPost, setAllPost] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);

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
  const handlePostDetail = (post: any) => {
    setSelectedPost(post);
    setIsOpenModalDelatil(true);
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
  const handleReactionRemove = () => {
    console.log("log");
  };
  return (
    <section className="md:w-[680px] w-[420px]  bg-white mt-2 md:p-4 p-2 shadow rounded-lg">
      {allPost.map((post, index) => (
        <div
          key={index}
          className="w-full mb-4 border rounded-md p-4 hover:bg-[#F9F9F9]"
        >
          <div className="flex items-center justify-between mb-2">
            <PostHeader user={user} post={post} handlerModal={handlerModal} />
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
          <PostContent post={post} />
          <div className="post_footer flex justify-between items-center gap-2 md:gap-10 mt-4 px-1">
            <ReactionSelector
              post={post}
              user={user}
              handleReactionClick={handleReactionClick}
              mapReactionToIcon={mapReactionToIcon}
              handleReactionRemove={handleReactionRemove}
            />
            <button
              className="footer-post"
              onClick={() => handlePostDetail(post)}
            >
              <span className="text-sm">Comment</span>
            </button>
          </div>
        </div>
      ))}
      {isOpenModalDelatil && (
        <ModalPostDetail
          post={selectedPost}
          closeModal={() => setIsOpenModalDelatil(false)}
          setRefreshPosts={setRefreshPosts}
        />
      )}
    </section>
  );
};
