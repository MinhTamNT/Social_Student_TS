import React from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CiImageOn } from "react-icons/ci";
export const ModalUploadPost = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50 rounded-lg">
      <div className="bg-white rounded-lg p-2 md:w-[520px] w-full h-screen md:h-[440px] md:max-h-[className(100vh - 56px - 25px)]">
        <div className="modal_header border-b py-2 flex items-center justify-between">
          <h3 className="text-center mx-auto text-xl">Tạo bài viết mới</h3>
          <button className="p-2 bg-bg-gray rounded-full">
            <IoMdClose size={16} />
          </button>
        </div>
        <div className="modal_content my-3">
          <div className="content_user flex items-center gap-2">
            <img
              src={user?.avatar_user}
              alt="avatar user"
              className="w-10 h-10 rounded-full"
            />
            <span className="nameUser">{user?.username}</span>
          </div>
          <div className="content-input-from-user">
            <textarea
              className="w-full p-2 text-[20px] md:h-[200px] h-[300px] outline-none"
              placeholder={user.username + " , bạn đang nghĩ gì thế ? "}
            ></textarea>
          </div>
          <div className="my-auto">
            <div className="border p-4 rounded-lg flex items-center gap-5">
              <span>Thêm vào bài viết của bạn</span>
              <button>
                <CiImageOn size={24} color="#45bd62" />
              </button>
            </div>
            <div className="action-post">
              <button className="w-full mt-2 bg-bg-blue text-white p-2 rounded-md text-16">
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
