import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import { deletedPostReaction, reactEmojiPost } from "../../Redux/apiRequest";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import ReactionSelector from "./ReactionPost";
import ModalPostDetail from "../Modal/ModaLPostDetail";
import { IoTrashBinOutline } from "react-icons/io5";
import { ModalDeletedPost } from "../Modal/ModalDeletedPost";
import { SlLike } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
interface PostProps {
  refreshPosts: boolean;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const mapReactionToIcon = (reactionType: string) => {
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

export const Post: React.FC<PostProps> = ({
  refreshPosts,
  setRefreshPosts,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [allPost, setAllPost] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
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
    setIsOpenModalDetail(true);
  };

  const fetchPosts = useCallback(async () => {
    try {
      let url = `${endpoints["all_post"]}?page=${page}`;
      setIsLoading(true);
      const res = await AuthAPI(auth?.access_token).get(url);
      const newPosts = res?.data?.results;
      if (newPosts.length > 0) {
        setAllPost((prev) => {
          const uniquePosts = [...prev, ...newPosts].reduce((acc, post) => {
            if (!acc.find((item: any) => item.id === post.id)) {
              acc.push(post);
            }
            return acc;
          }, []);
          return uniquePosts;
        });
      }
      if (res?.data?.next === null) {
        setHasMorePosts(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [page, auth?.access_token]);

  useEffect(() => {
    fetchPosts();
  }, [refreshPosts, fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMorePosts) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, hasMorePosts]);

  const handleReactionClick = async (postId: number, reactType: string) => {
    try {
      await reactEmojiPost(postId, auth?.access_token, dispatch, {
        reaction_type: reactType,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };
  const handleReactionRemove = async (postId: number) => {
    try {
      await deletedPostReaction(postId, auth?.access_token, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="md:w-[680px] w-[420px] bg-white mt-2 md:p-4 p-2 shadow rounded-lg">
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
      {isOpenModalDetail && (
        <ModalPostDetail
          post={selectedPost}
          closeModal={() => setIsOpenModalDetail(false)}
          setRefreshPosts={setRefreshPosts}
        />
      )}
      <div ref={observerRef}></div>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <FaSpinner className="animate-spin" size={24} />
        </div>
      )}
      {!hasMorePosts && <p>Không còn bài viết nào nữa.</p>}
    </section>
  );
};
