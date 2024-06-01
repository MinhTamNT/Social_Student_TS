import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { CreatePost } from "../../Post/CreatePost";
export const TabsPost = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
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
        <CreatePost />
      </div>
    </div>
  );
};
