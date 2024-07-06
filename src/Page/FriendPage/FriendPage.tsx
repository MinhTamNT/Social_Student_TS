import React, { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { mapReactionToIcon } from "../../Components/Post/Post";
import PostContent from "../../Components/Post/PostContent";
import PostHeader from "../../Components/Post/PostHeader";
import ReactionSelector from "../../Components/Post/ReactionPost";
import { useIsMobile } from "../../Hook/useIsMobile";
import { reactEmojiPost } from "../../Redux/apiRequest";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";

export const FriendPage: React.FC = () => {
  const { otherId } = useParams<{ otherId: string }>();
  const dispatch = useDispatch();
  const [otherUser, setOtherUser] = useState<any>(null);
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const user = useSelector((state: RootState) => state?.user?.user.currentUser);
  const ws = useRef<WebSocket | null>(null);
  const isMobile = useIsMobile();
  const [post, setPost] = useState<any[]>([]);
  const [, setRefreshPosts] = useState(false);

  const getOtherUser = async (userId: number) => {
    try {
      const res = await AuthAPI(auth?.access_token).get(
        endpoints["get-user-id"](userId)
      );
      setOtherUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (otherId) {
      const userId = parseInt(otherId, 10);
      getOtherUser(userId);
    }
  }, [otherId, auth?.access_token]);

  const getAllPost = async () => {
    try {
      if (otherId) {
        const userId = parseInt(otherId, 10);
        const res = await AuthAPI(auth?.access_token).get(
          endpoints["get-all-post-user"](userId)
        );
        setPost(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [otherId, auth?.access_token]);

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
    console.log("Handle remove reaction here");
  };

  const sendFriendRequest = (friendId: number) => {
    const wsUrl = `ws://localhost:8000/ws/friend_notification/?token=${auth?.access_token}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");

      const requestData = {
        action: "send_friend_request",
        friend_id: friendId,
      };
      ws.send(JSON.stringify(requestData));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  useEffect(() => {
    return () => {
      ws.current?.close();
    };
  }, []);

  const goBack = () => {};
  let isFollowing = null;
  const userFollowing: (string | number)[] = user?.following || [];
  console.log("Following list:", userFollowing);
  if (otherId !== undefined) {
    const otherIdStr = otherId.toString();

    isFollowing = userFollowing.map((id) => id.toString()).includes(otherIdStr);

    console.log("Is Following:", isFollowing);
  } else {
    console.log("Other ID is undefined");
  }

  return (
    <section className="relative h-screen">
      <div className="header-profile flex justify-between items-center p-2 bg-white shadow-sm md:hidden">
        <div className="flex items-center gap-2">
          <button onClick={goBack}>
            <GrLinkPrevious size={24} className="font-bold" />
          </button>
          <span className="mx-auto text-16 font-bold ">
            {otherUser?.first_name} {otherUser?.last_name}
          </span>
        </div>
        <span className="text-16 text-blue-500">Your personal page</span>
      </div>
      <div className="md:w-[1095px] mx-auto">
        <div className="picture_user relative">
          <div className="cover_picture">
            {otherUser?.cover_picture ? (
              <img
                src={otherUser.cover_picture}
                alt="cover_photo_user"
                className="w-full h-[149px] md:h-[349px] border-none object-cover"
              />
            ) : (
              <div className="bg-black h-[149px] md:h-[349px] rounded-md"></div>
            )}
          </div>
          <div
            className={`flex items-center w-full gap-2 absolute left-1 ${
              isMobile ? "bottom-[-30px]" : "bottom-[-120px]"
            }`}
          >
            <img
              src={otherUser?.avatar_user}
              alt="avatar_user"
              className={`${
                isMobile ? "h-[128px] w-[128px]" : "w-[168px] h-[168px]"
              } rounded-full`}
            />
            <div className="z-10 md:flex w-full justify-between hidden">
              <div className="flex flex-col">
                <span className="text-16 font-medium">
                  {otherUser?.first_name} {otherUser?.last_name}
                </span>
                <span className="text-16 font-medium">
                  15 <span className="text-gray-500">Friend</span>
                </span>
              </div>
              {isFollowing ? (
                <>
                  <button
                    className="flex text-white items-center justify-center bg-slate-500 md:w-[500px] w-full h-9 p-2 rounded-lg"
                    onClick={() => sendFriendRequest(otherUser?.id)}
                  >
                    <CiUser size={"24"} />
                    Unfollow
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex text-white items-center justify-center bg-red-500 md:w-[500px] w-full h-9 p-2 rounded-lg"
                    onClick={() => sendFriendRequest(otherUser?.id)}
                  >
                    <CiUser size={"24"} />
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="md:pt-[120px] hidden md:block">
          <p className="mb-2 font-bold p-2 text-lg">All Post User</p>
          {post.map((allPost, index) => (
            <div className="mb-2" key={index}>
              <PostHeader post={allPost} user={otherUser} />
              <PostContent post={allPost} />
              <div className="post_footer flex justify-between items-center gap-2 md:gap-10 mt-4 px-1">
                <ReactionSelector
                  post={allPost}
                  user={otherUser}
                  handleReactionClick={handleReactionClick}
                  mapReactionToIcon={mapReactionToIcon}
                  handleReactionRemove={handleReactionRemove}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isMobile && (
        <div className="user-detail py-10 flex flex-col px-2">
          <>
            <span className="text-16 font-medium">
              {otherUser?.first_name} {otherUser?.last_name}
            </span>
            <span className="text-16 font-medium">
              15 <span className="text-gray-500">Friend</span>
            </span>
            <div className="action-user-edit w-full flex justify-center mt-2 cursor-pointer">
              <button
                className="flex text-white items-center justify-center bg-blue-500 md:w-[500px] w-full h-9 p-2 rounded-lg"
                onClick={() => sendFriendRequest(otherUser?.id)}
              >
                <CiUser size={"24"} />
                Add Friend
              </button>
            </div>
          </>

          <div className="mt-10">
            {post.map((allPost, index) => (
              <div className="mb-2" key={index}>
                <PostHeader post={allPost} user={otherUser} />
                <PostContent post={allPost} />
                <div className="post_footer flex justify-between items-center gap-2 md:gap-10 mt-4 px-1">
                  <ReactionSelector
                    post={allPost}
                    user={otherUser}
                    handleReactionClick={handleReactionClick}
                    mapReactionToIcon={mapReactionToIcon}
                    handleReactionRemove={handleReactionRemove}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
