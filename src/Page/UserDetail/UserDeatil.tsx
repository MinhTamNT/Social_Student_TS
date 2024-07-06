import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalEditUser from "../../Components/Modal/ModalEditUser";
import { useIsMobile } from "../../Hook/useIsMobile";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CustomTabPanel } from "../../Components/TabView/CustomTabPanel/CustomTabPanel";
import { TabsPost } from "../../Components/TabView/Tabs/TabsPost";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import PostHeader from "../../Components/Post/PostHeader";
import PostContent from "../../Components/Post/PostContent";
import ReactionSelector from "../../Components/Post/ReactionPost";
import { mapReactionToIcon } from "../../Components/Post/Post";
import { reactEmojiPost } from "../../Redux/apiRequest";
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const UserDeatil = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const isMobile = useIsMobile();
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [, setRefreshPosts] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const goBack = () => {
    navigate(-1);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPost = async () => {
      const res = await AuthAPI(auth?.access_token).get(
        endpoints["get-all-post-user"](user?.id)
      );
      setPost(res.data);
    };
    getAllPost();
  }, [user?.id]);
  console.log(user);
  
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
    <section className=" relative h-screen">
      <div className="header-profile flex justify-between items-center p-2 bg-white shadow-sm md:hidden  ">
        <div className="flex items-center gap-2">
          <button onClick={goBack}>
            <GrLinkPrevious size={24} className="font-bold" />
          </button>
          <span className="mx-auto text-16 font-bold ">
            {user?.first_name}
            {user?.last_name}
          </span>
        </div>
        <span className="text-16 text-blue-500">Your personal page</span>
      </div>
      <div className="md:w-[1095px] mx-auto">
        <div className="picture_user relative ">
          <div className="cover_picture ">
            {user.cover_photo ? (
              <>
                <img
                  src={user?.cover_photo}
                  alt="cover_photo_user"
                  className="w-full h-[149px] md:h-[349px] border-none object-cover"
                />
              </>
            ) : (
              <>
                <div className="bg-black h-[149px] md:h-[349px] rounded-md"></div>
              </>
            )}
            <button className="absolute right-5 bottom-2 border p-2 rounded-full bg-slate-200">
              <FaCamera />
            </button>
          </div>
          <div
            className={`flex items-center w-full gap-2 absolute left-1 ${
              isMobile ? "bottom-[-30px]" : "bottom-[-120px]"
            }`}
          >
            <img
              src={user?.avatar_user}
              alt="avatar_user"
              className={`${
                isMobile ? "h-[128px] w-[128px]" : "w-[168px] h-[168px]"
              } rounded-full`}
            />
            <div className="z-10 md:flex w-full justify-between hidden ">
              <div className="flex flex-col">
                <span className="text-16 font-medium">
                  {user?.first_name}
                  {user?.last_name}
                </span>
                <span className="text-16 font-medium">
                  15 <span className="text-gray-500">Friend</span>
                </span>
              </div>

              <button
                className="flex text-white items-center mr-2 justify-center bg-blue-500 md:w-[300px] w-full h-9 p-2 rounded-lg"
                onClick={() => setIsModalEdit(!isModalEdit)}
              >
                <MdEdit size={"24"} />
                Edit Profile
              </button>
            </div>
          </div>
          <button
            className={`absolute  ${
              isMobile ? "left-24" : "bottom-[-110px] left-[120px]"
            } border p-2 rounded-full bg-slate-200`}
          >
            <FaCamera />
          </button>
        </div>
        <div className="md:pt-[120px] hidden md:block">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Your Post" {...a11yProps(0)} />
                <Tab label=" Friend" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <TabsPost user={user} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Friend
            </CustomTabPanel>
          </Box>
        </div>
      </div>

      {isMobile && (
        <div className="user-detail py-10 flex flex-col px-2">
          <>
            <span className="text-16 font-medium">
              {user?.first_name}
              {user?.last_name}
            </span>
            <span className="text-16 font-medium">
              15 <span className="text-gray-500">Friend</span>
            </span>
            <div className="action-user-edit w-full flex justify-center mt-2 cursor-pointer">
              <button
                className="flex text-white items-center justify-center bg-blue-500 md:w-[500px] w-full h-9 p-2 rounded-lg"
                onClick={() => setIsModalEdit(!isModalEdit)}
              >
                <MdEdit size={"24"} />
                Edit Profile
              </button>
            </div>
          </>
          <div className="list-Friend md:pt-20 md:p-2 ư-">
            <div className="flex-box-default mb-2">
              <p className=" font-medium text-xl">Friend</p>
              <p className="text-blue-500 cursor-pointer">Xem tất cả</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {listFrined.map((friend, index) => (
                <div className="col-span-1" key={index}>
                  <img
                    src={friend.avatar_user}
                    alt="friend-avatar"
                    className="rounded-lg h-28"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
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
                  {/* <button
                    className="footer-post"
                    onClick={() => handlePostDetail(post)}
                  >
                    <span className="text-sm">Comment</span>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalEdit && (
        <ModalEditUser setModalEdit={setIsModalEdit} profile={user} />
      )}
    </section>
  );
};
