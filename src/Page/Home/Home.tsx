import { Post } from "../../Components/Post/Post";
import { PostStory } from "../../Components/Post/PostStory";

export const Home = () => {
  return (
    <div className="md:w-[1120px] md:ml-[100px] px-2 pt-2">
      <div className="md:w-[920px] object-cover ">
        <PostStory />
      </div>
      <div>
        <Post />
      </div>
    </div>
  );
};
