import React, { useState } from "react";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CiImageOn } from "react-icons/ci";
import { UploadIcon } from "../../assets/icons/icon";
import { createPost } from "../../Redux/apiRequest";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Loading } from "../LoadingPage/LoadingPage";

interface IProp {
  setModalUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalUploadPost = ({
  setModalUploadPost,
  setRefreshPosts,
}: IProp) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showUploadArea, setShowUploadArea] = useState<boolean>(false);
  const [contentPost, setContentPost] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleUploadButtonClick = () => {
    setShowUploadArea(true);
  };

  const handleAddMediaButtonClick = () => {
    const input = document.getElementById("file");
    if (input) {
      input.click();
    }
  };

  const addEmoji = (e: any) => {
    const sym = e.unified.split("_");
    const emojiCodePoints: number[] = sym.map((el: string) => parseInt(el, 16));
    const emojiString = emojiCodePoints.map((codePoint: number) =>
      String.fromCodePoint(codePoint)
    );
    setContentPost(contentPost + emojiString);
  };

  const handlePostSubmit = async () => {
    setIsSubmitting(true);
    setRefreshPosts((prev) => !prev);
    const formData = new FormData();
    formData.append("content", contentPost);
    selectedFiles.forEach((file) => {
      formData.append(`media_file`, file);
    });

    try {
      await createPost(auth?.access_token, formData, dispatch);
      setModalUploadPost(false);
      setIsLoading(true);
      setRefreshPosts((prev) => !prev);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng bài viết:", error);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handlerCloseModal = () => {
    setModalUploadPost(false);
  };

  return (
    <div className="fixed inset-0 flex z-30 justify-center items-center bg-black bg-opacity-50 rounded-lg">
      {isLoading && <Loading />}
      <div className="bg-white rounded-lg p-4 md:w-[500px] w-full md:h-auto h-screen">
        <div className="modal_header border-b py-2 flex items-center justify-between">
          <h3 className="text-center mx-auto text-xl font-semibold">
            Tạo bài viết mới
          </h3>
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handlerCloseModal}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <div className="modal_content w-full  flex flex-col ">
          <div className="content_user flex items-center gap-2">
            <img
              src={user?.avatar_user}
              alt="avatar user"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{user?.username}</span>
          </div>
          <div className="content-input-from-user flex flex-col space-y-2">
            <textarea
              className="w-full h-[60px] p-2 text-lg outline-none  rounded-md resize-none"
              placeholder="Bạn đang nghĩ gì thế?"
              value={contentPost}
              onChange={(e) => setContentPost(e.target.value)}
            ></textarea>
            {showUploadArea && (
              <div className="mt-2 flex flex-col space-y-2">
                {selectedFiles.length > 0 ? (
                  <div
                    className={`rounded-xl border w-full p-2 grid ${
                      selectedFiles.length > 1 ? "grid-cols-2 gap-2" : ""
                    }`}
                  >
                    {selectedFiles.map((file, index) => (
                      <div
                        key={file.name}
                        className={`relative ${
                          selectedFiles.length > 1 && index === 0
                            ? "col-span-2"
                            : ""
                        }`}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="object-cover w-full h-auto rounded-md"
                          alt="image_user_post"
                          style={{ maxHeight: "200px" }}
                        />
                        {index === 0 && (
                          <button
                            className="absolute top-2 left-2 bg-white p-2 rounded-full hover:bg-gray-100"
                            onClick={handleAddMediaButtonClick}
                          >
                            <IoMdCreate size={24} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-md p-4 cursor-pointer"
                  >
                    <UploadIcon />
                    <p className="text-gray-500">Upload video/image</p>
                  </label>
                )}
              </div>
            )}
            <input
              id="file"
              className="hidden"
              name="text"
              type="file"
              multiple
              accept="image/*, video/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="border-t pt-3 flex justify-center flex-col absolute md:static bottom-2 w-[90%]  ">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Thêm vào bài viết của bạn</span>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={handleUploadButtonClick}
                >
                  <CiImageOn size={24} color="#45bd62" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>
                {showEmojiPicker && (
                  <div className="absolute top-20 right-2 z-10">
                    <Picker
                      data={data}
                      onEmojiSelect={addEmoji}
                      emojiSize={20}
                      emojiButtonSize={28}
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              className={`w-full mt-2 bg-blue-500 my-auto text-white p-2 rounded-md text-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePostSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="spinner"></div> : "Đăng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
