import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostHeader: React.FC<{
  post: any;
  user: any;
  handlerModal?: () => void;
}> = ({ post, user, handlerModal }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (post?.user?.id !== user?.id) {
      navigate(`/user-other/${post.user.id}`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2" onClick={handleUserClick}>
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
    </>
  );
};

export default PostHeader;
