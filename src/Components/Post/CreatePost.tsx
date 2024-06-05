import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { ModalUploadPost } from "../Modal/ModalUploadPost";

interface CreatePostProps {
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ setRefreshPosts }) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [isModalUploadPost, setIsModalUploadPost] = useState<boolean>(false);
  const handlerOpenUploadPost = () => {
    setIsModalUploadPost(!isModalUploadPost);
  };
  return (
    <>
      <div className="w-full md:w-[680px] h-[123px] mb-2 md:mt-2 bg-white  rounded-md shadow-sm ">
        <div
          className="userCreatePost flex border-b p-2 gap-2 items-center cursor-pointer"
          onClick={handlerOpenUploadPost}
        >
          <img
            src={user?.avatar_user}
            alt="avatar_user"
            className="w-10 h-10 rounded-full"
          />
          <input
            placeholder="What do you think ?"
            className="text-16 px-3 py-3 text-gray-400 md:py-2 w-full rounded-2xl border cursor-pointer"
          />
        </div>
        <div className="chooseUploadWith flex items-center gap-10 mt-1 ml-10">
          <button className="flex items-center gap-2">
            <CiImageOn size={32} color="#45bd62" />
            <span className="text-13">Image/Video</span>
          </button>
        </div>
      </div>
      {isModalUploadPost && (
        <ModalUploadPost
          setModalUploadPost={setIsModalUploadPost}
          setRefreshPosts={setRefreshPosts}
        />
      )}
    </>
  );
};
