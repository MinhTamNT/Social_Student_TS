import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalEditUser from "../../Components/Modal/ModalEditUser";
import { useIsMobile } from "../../Hook/useIsMobile";
export const UserDeatil = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="bg-white md:w-[1095px] h-screen mx-auto relative">
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
      <div className="picture_user relative ">
        <div className="cover_picture ">
          <img
            src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/440291400_417378867741407_379319573965574938_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BWDAublWt98Q7kNvgFh1ZN_&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfARbAUU_5YvM0oZTRl_EMqwqFxUO-S8rA3XElk_Yi1_qA&oe=663C0AC7"
            alt="cover_photo_user"
            className="w-full h-[149px] md:h-[349px] border-none object-cover"
          />
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
      {isMobile && (
        <div className="user-detail py-10 flex flex-col px-2">
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
        </div>
      )}
      {isModalEdit && (
        <ModalEditUser setModalEdit={setIsModalEdit} profile={user} />
      )}
    </section>
  );
};
