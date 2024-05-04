import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { ModalUploadPost } from "../Modal/ModalUploadPost";
export const CreatePost = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [isModalUploadPost, setModalUploadPost] = useState(false);
  const handlerOpenUploadPost = () => {
    setModalUploadPost(!isModalUploadPost);
  };
  return (
    <>
      <div className="w-[375px] md:w-[680px] h-[123px] mb-2 md:mt-2  rounded-md shadow-md ">
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
            className="text-16 px-3 py-3 md:py-2 w-full rounded-2xl border cursor-pointer"
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
        <ModalUploadPost setModalUploadPost={setModalUploadPost} />
      )}
    </>
  );
};
