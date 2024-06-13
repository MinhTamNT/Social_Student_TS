import React, { useState } from "react";
import PostHeader from "../Post/PostHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import PostContent from "../Post/PostContent";
import ReactionSelector from "../Post/ReactionPost";
import { SlLike } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { reactEmojiPost } from "../../Redux/apiRequest";
import { IoMdClose } from "react-icons/io";

interface ReactionType {
  id: number;
  user_id: number;
  reaction_type: string;
}

interface PostType {
  id: number;
  react: string;
  reaction: ReactionType[];
  likes: number;
}

interface CommentType {
  id: number;
  user: { id: number; name: string; avatar: string };
  content: string;
}

interface ModalPostDetailProps {
  post: PostType;
  closeModal: () => void;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPostDetail: React.FC<ModalPostDetailProps> = ({
  post,
  closeModal,
  setRefreshPosts,
}) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const dummyComments: CommentType[] = [
    {
      id: 1,
      user: { id: 1, name: "Jane Doe", avatar: "https://via.placeholder.com/40" },
      content: "This is a great post!",
    },
    {
      id: 2,
      user: { id: 2, name: "John Smith", avatar: "https://via.placeholder.com/40" },
      content: "Thanks for sharing!",
    },
  ];

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

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCommentObj: CommentType = {
      id: dummyComments.length + 1,
      user: { id: user.id, name: user.name, avatar: user.avatar },
      content: newComment,
    };
    dummyComments.push(newCommentObj);
    setNewComment("");
  };

  const handleRemoveTheReaction = () => {
    console.log("hello");
  };

  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white h-screen overflow-auto w-full md:h-[700px] p-4 md:w-[900px] rounded-lg shadow-lg">
        <div className="sticky z-20 top-0 bg-white shadow-sm p-2 flex justify-between items-center">
          <p className="text-xl mx-auto font-semibold">Thông tin bài viết</p>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="mt-2">
          <PostHeader post={post} user={user} />
          <PostContent post={post} />
          <div className="footer-post mt-4">
            <div className="flex items-center space-x-4">
              <ReactionSelector
                post={post}
                user={user}
                handleReactionClick={handleReactionClick}
                mapReactionToIcon={mapReactionToIcon}
                handleReactionRemove={handleRemoveTheReaction}
              />
              <p>{post.likes} likes</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <div className="space-y-4">
              {dummyComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="mt-4 text-gray-600">Đăng nhập để bình luận.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPostDetail;
