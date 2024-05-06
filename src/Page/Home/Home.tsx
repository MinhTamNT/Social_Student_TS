import { CreatePost } from "../../Components/Post/CreatePost";
import { Post } from "../../Components/Post/Post";
import { PostStory } from "../../Components/Post/PostStory";
import { useIsMobile } from "../../Hook/useIsMobile";
export const Home = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="md:w-[1120px] md:ml-[100px] px-2 pt-2">
        {isMobile && <CreatePost />}
        <PostStory />
        {!isMobile && <CreatePost />}
        <Post />
      </div>
    </>
  );
};
