import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { FacebookSelector } from "@charkour/react-reactions";
import { SlLike } from "react-icons/sl";

interface Reaction {
  id: number;
  user_id: number;
  reaction_type: string;
}

interface User {
  id: number;
}

interface Post {
  id: number;
  react: string;
  reaction: Reaction[];
}

interface ReactionSelectorProps {
  post: Post;
  user: User;
  handleReactionClick: (postId: number, reactType: string) => void;
  handleReactionRemove : (postId: number) => void;
  mapReactionToIcon: (reactionType: string) => JSX.Element | null;
}

const ReactionSelector: React.FC<ReactionSelectorProps> = ({
  post,
  user,
  handleReactionClick,
  handleReactionRemove,
  mapReactionToIcon,
}) => {
  const [userReaction, setUserReaction] = useState<Reaction | null>(null);

  useEffect(() => {
    const reaction = post.reaction.find((reaction) => reaction.user_id === user.id);
    setUserReaction(reaction || null);
  }, [post.reaction, user.id]);

  const handleButtonClick = () => {
    if (userReaction) {
      handleReactionRemove(post.id); // Gọi API huỷ reaction
      setUserReaction(null); // Cập nhật trạng thái sau khi huỷ
    } else {
      // Open reaction selector
    }
  };

  return (
    <Tippy
      interactive={true}
      arrow={true}
      placement="top-end"
      render={(attrs) => (
        <div {...attrs} tabIndex={-1}>
          <div className="tippy-content">
            <FacebookSelector
              reactions={["like", "love", "haha"]}
              onSelect={(reaction) => {
                handleReactionClick(post.id, reaction);
                setUserReaction({ id: Date.now(), user_id: user.id, reaction_type: reaction });
              }}
            />
          </div>
        </div>
      )}
    >
      <button
        className="p-2 rounded-md flex items-center gap-2 bg-gray-100 hover:bg-gray-200"
        onClick={handleButtonClick}
      >
        {userReaction ? (
          mapReactionToIcon(userReaction.reaction_type)
        ) : (
          <SlLike size={24} />
        )}
        {userReaction && (
          <span className="text-sm">
            {userReaction.reaction_type}
          </span>
        )}
      </button>
    </Tippy>
  );
};

export default ReactionSelector;
