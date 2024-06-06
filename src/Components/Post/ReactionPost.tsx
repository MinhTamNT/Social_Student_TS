import React from "react";
import Tippy from "@tippyjs/react/headless";
import { FacebookSelector } from "@charkour/react-reactions";
import { SlLike } from "react-icons/sl";

const ReactionSelector: React.FC<{
  post: any;
  user: any;
  handleReactionClick: (postId: number, reactType: string) => void;
  hasUserReactedToPost: (
    postId: number,
    userId: number,
    reactions: any[]
  ) => boolean;
  mapReactionToIcon: (reactionType: string) => JSX.Element | null;
}> = ({
  post,
  user,
  handleReactionClick,
  hasUserReactedToPost,
  mapReactionToIcon,
}) => {
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
              onSelect={(reaction) => handleReactionClick(post.id, reaction)}
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
  );
};

export default ReactionSelector;
