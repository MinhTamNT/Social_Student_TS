import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalEditUser from "../../Components/Modal/ModalEditUser";
export const UserDeatil = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [isModalEdit, setModalEdit] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="bg-white">
      <div className="header-profile flex justify-between items-center p-2 bg-white shadow-sm ">
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
      <div className="picture_user relative">
        <div className="cover_picture ">
          <img
            src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/440291400_417378867741407_379319573965574938_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BWDAublWt98Q7kNvgFh1ZN_&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfARbAUU_5YvM0oZTRl_EMqwqFxUO-S8rA3XElk_Yi1_qA&oe=663C0AC7"
            alt="cover_photo_user"
            className="w-full h-[149px] border-none object-cover"
          />
          <button className="absolute right-5 top-[100px] border p-2 rounded-full bg-slate-200">
            <FaCamera />
          </button>
        </div>
        <div className="avatar_user">
          <img
            src={user?.avatar_user}
            alt="cover_photo_user"
            className="w-[142px] h-[142px] border-none rounded-full absolute top-12 left-5  "
          />
          <button className="absolute left-[130px] bottom-[-26px] border p-2 rounded-full bg-slate-200">
            <FaCamera />
          </button>
        </div>
      </div>
      <div className="user-detail py-10 flex flex-col px-2">
        <span className="text-16 font-medium">
          {user?.first_name}
          {user?.last_name}
        </span>
        <span className="text-16 font-medium">
          15 <span className="text-gray-500">Friend</span>
        </span>
        <div className="action-user-edit w-full mt-2 cursor-pointer">
          <button
            className="flex text-white items-center justify-center bg-blue-500 w-full h-9 p-2 rounded-lg"
            onClick={() => setModalEdit(!isModalEdit)}
          >
            <MdEdit size={"24"} />
            Edit Profile
          </button>
        </div>
      </div>
      {isModalEdit && (
        <ModalEditUser setModalEdit={setModalEdit} profile={user} />
      )}
    </section>
  );
};
