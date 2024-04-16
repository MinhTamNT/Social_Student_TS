import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
export const Post = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const fakePostData = [
    {
      id: 1,
      author: "John Doe",
      avatar_user:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      content: "This is the first post.",
      imageUrl:
        "https://cdn-i.vtcnews.vn/resize/la/upload/2024/04/11/com-ga13-16043282.jpg",
      timestamp: "2024-04-11T12:00:00Z",
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "This is the second post.",
      avatar_user:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      imageUrl:
        "https://t.ex-cdn.com/nongnghiep.vn/resize/800x450/files/news/2024/04/13/z5344511212667_4f66b5ac4b29118fc4dc4a24003c1c26-nongnghiep-170603.jpg",
      timestamp: "2024-04-10T08:30:00Z",
    },
  ];
  return (
    <section className="md:w-[680px] w-[372px] h-auto mt-2">
      {fakePostData.map((post, index) => (
        <div
          key={index}
          className="h-full w-full  mb-4 border rounded-md p-2 hover:bg-[#EEEEEE]"
        >
          <div className="post_header flex items-center justify-between gap-2 ">
            <div className="flex gap-2">
              <img
                src={post.avatar_user}
                alt="avatar_user"
                className="w-10 h-10 rounded-full"
              />
              <div className="info_user_post flex flex-col">
                <span className="text-16">{post.author}</span>
                <span className="text-13">
                  {formatTimestamp(post.timestamp)}
                </span>
              </div>
            </div>
            <div className="header_action">
              <button>
                <HiOutlineDotsHorizontal size={32} />
              </button>
            </div>
          </div>
          <div className="post_content">
            <p className="text-13">{post.content}</p>
            <img
              src={post.imageUrl}
              className=" object-cover"
              alt="post_content"
            />
          </div>
          <div className="post_footer flex items-center gap-10 mt-2 px-1">
            <button className=" p-2 rounded-md flex items-center gap-2">
              <AiFillLike size={24} />
              <span>6</span>
            </button>
            <button className=" p-2 rounded-md flex items-center gap-2">
              <FaRegComment size={24} />
              <span>6</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
