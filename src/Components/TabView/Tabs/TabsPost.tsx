import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { CreatePost } from "../../Post/CreatePost";
import { SetStateAction, useEffect, useState } from "react";
import { AuthAPI, endpoints } from "../../../Service/ApiConfig";
import PostHeader from "../../Post/PostHeader";
import PostContent from "../../Post/PostContent";
import { reactEmojiPost } from "../../../Redux/apiRequest";
import ReactionSelector from "../../Post/ReactionPost";
import { mapReactionToIcon } from "../../Post/Post";

interface IProp {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const TabsPost: React.FC<IProp> = ({ user }: IProp) => {
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const [, setRefreshPosts] = useState(false);
  const listFrined = [
    {
      id: 1,
      username: "Nguyen Van A",
      avatar_user:
        "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
    },
    {
      id: 2,
      username: "Nguyen Van C",
      avatar_user:
        "https://taimienphi.vn/tmp/cf/aut/UCJh-I6e5-pGG8-5NjT-O83K-mmJy-eZta-9nqH-anh-dai-dien-dep-cute-1.jpg",
    },
    {
      id: 3,
      username: "Nguyen Van D",
      avatar_user:
        "https://i.9mobi.vn/cf/Images/tt/2021/3/15/hinh-anh-dai-dien-dep-dung-cho-facebook-instagram-zalo-9.jpg",
    },
  ];
  useEffect(() => {
    const getAllPost = async () => {
      const res = await AuthAPI(auth?.access_token).get(
        endpoints["get-all-post-user"](user?.id)
      );
      setPost(res.data);
    };
    getAllPost();
  }, [user?.id]);
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
  const handleReactionRemove = () => {
    console.log("log");
  };
  return (
    <div className="flex gap-5">
      <div className="w-3/10">
        <div className="list-information">
          <div className="user-detail w-[420px]  h-40">
            <h6 className="font-medium text-lg">Introduce</h6>
            <p className="text-base mb-1">First Name: {user?.first_name}</p>
            <p className="text-base mb-1">Last Name: {user.last_name}</p>
            <p className="text-base">Email: {user.email}</p>
          </div>
          <div className=" user-detail w-[420px] h-96 mt-2 b">
            <div className="flex-box-default mb-2">
              <p className=" font-medium text-xl">Friend</p>
              <p className="text-blue-500 cursor-pointer">Xem tất cả</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {listFrined.map((friend, index) => (
                <div className="col-span-1">
                  <img
                    src={friend.avatar_user}
                    alt="friend-avatar"
                    className="rounded-lg h-28"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] h-auto">
        <CreatePost
          setRefreshPosts={function (value: SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          }}
        />
        {post.map((allPost, index) => (
          <div className="mb-2" key={index}>
            <PostHeader post={allPost} user={user} />
            <PostContent post={allPost} />
            <div className="post_footer flex justify-between items-center gap-2 md:gap-10 mt-4 px-1">
              <ReactionSelector
                post={allPost}
                user={user}
                handleReactionClick={handleReactionClick}
                mapReactionToIcon={mapReactionToIcon}
                handleReactionRemove={handleReactionRemove}
              />
              <button className="footer-post">
                <span className="text-sm">Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
