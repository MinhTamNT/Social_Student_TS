import React, { useEffect, useState } from "react";
import PostHeader from "../Post/PostHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import PostContent from "../Post/PostContent";
import ReactionSelector from "../Post/ReactionPost";
import { SlLike } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { commentPost, reactEmojiPost } from "../../Redux/apiRequest";
import { IoMdClose } from "react-icons/io";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { replyToComment } from "../../Redux/commentSlice";
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
  user: { id: number; username: string; avatar_user: string };
  comment: string;
  replies?: CommentType[];
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
  const user = useSelector((state: RootState) => state.user.user.currentUser);
  const auth = useSelector((state: RootState) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState<{ [key: number]: string }>(
    {}
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(
    null
  );
  const [dummnyComment, setDummnyComment] = useState<CommentType[]>([]);
  useEffect(() => {
    fetchComments();
  }, [post?.id, auth?.access_token]);

  const fetchComments = async () => {
    try {
      const res = await AuthAPI(auth?.access_token).get(
        endpoints["get-comment-post"](post?.id)
      );
      console.log(res.data);

      setDummnyComment(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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

  const handleCommentSubmit = async (postId: number) => {
    try {
      const newCommentData = { comment: newComment };
      await commentPost(postId, auth?.access_token, newCommentData, dispatch);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplySubmit = (commentId: number) => {
    try {
      const accessToken = auth?.access_token ?? "";
      const comment = replyComment[commentId]; // Get the specific comment for commentId
      appDispatch(replyToComment({ commentId, accessToken, comment }));
      setReplyComment((prevState) => ({ ...prevState, [commentId]: "" }));
      fetchComments();
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleRemoveTheReaction = async () => {
    try {
      await reactEmojiPost(post.id, auth?.access_token, dispatch, {
        reaction_type: null,
      });
      setRefreshPosts((prev) => !prev);
    } catch (error) {
      console.error("Error removing reaction:", error);
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    comment: CommentType
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await AuthAPI(auth?.access_token).delete(
        endpoints["deleted-comment"](commentId)
      );
      fetchComments();
      handleMenuClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (commentId: number) => {
    console.log(commentId);
    handleMenuClose();
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
              <p>{post.reaction.length} likes</p>
            </div>
          </div>
          <div className="mt-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <div className="space-y-4 mb-3">
              {dummnyComment.map((comment) => (
                <div key={comment.id} className="flex flex-col space-y-2">
                  <div className="flex items-start space-x-4">
                    <img
                      src={comment.user.avatar_user}
                      alt={comment.user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{comment.user.username}</p>
                      <p className="text-gray-600">{comment.comment}</p>
                    </div>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, comment)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                  <div className="ml-12">
                    {comment.replies?.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex items-start space-x-4 mt-2"
                      >
                        <img
                          src={reply.user.avatar_user}
                          alt={reply.user.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{reply.user.username}</p>
                          <p className="text-gray-600">{reply.comment}</p>
                        </div>
                      </div>
                    ))}

                    {user && (
                      <div className="mt-2">
                        <textarea
                          value={replyComment[comment.id] || ""}
                          onChange={(e) =>
                            setReplyComment((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                          placeholder="Reply to this comment..."
                          className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                        ></textarea>
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                          Post Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {user ? (
              <>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                ></textarea>
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Post Comment
                </button>
              </>
            ) : (
              <p className="mt-4 text-gray-600">Đăng nhập để bình luận.</p>
            )}
          </div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() =>
            selectedComment && handleEditComment(selectedComment.id)
          }
        >
          <EditIcon fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            selectedComment && handleDeleteComment(selectedComment.id)
          }
        >
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ModalPostDetail;
