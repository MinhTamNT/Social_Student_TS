import React, { useState } from "react";
import { CreatePost } from "../../Components/Post/CreatePost";
import { Post } from "../../Components/Post/Post";
import { PostStory } from "../../Components/Post/PostStory";
import { useIsMobile } from "../../Hook/useIsMobile";

export const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const [refreshPosts, setRefreshPosts] = useState(false);

  return (
    <div className="md:w-[1120px] md:ml-[100px] md:px-2 md:pt-2">
      {isMobile && <CreatePost setRefreshPosts={setRefreshPosts} />}
      <PostStory />
      {!isMobile && <CreatePost setRefreshPosts={setRefreshPosts} />}
      <Post refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts} />
    </div>
  );
};
