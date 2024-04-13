import { useState, useEffect } from "react";
import { CreatePost } from "../../Components/Post/CreatePost";
import { Post } from "../../Components/Post/Post";
import { PostStory } from "../../Components/Post/PostStory";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:w-[1120px] md:ml-[100px] px-2 pt-2">
      {isMobile && <CreatePost />}
      <PostStory />
      {!isMobile && <CreatePost />}
      <Post />
    </div>
  );
};
