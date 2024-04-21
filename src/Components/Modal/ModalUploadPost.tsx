import React, { useState } from "react";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CiImageOn } from "react-icons/ci";
import { UploadIcon } from "../../assets/icons/icon";
import { createPost } from "../../Redux/apiRequest";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface IProp {
  setModalUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModalUploadPost = ({ setModalUploadPost }: IProp) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [contentPost, setContentPost] = useState<string>(
    "Bạn đang nghĩ gì thế?"
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái đang xử lý đăng bài
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Trạng thái để hiển thị hoặc ẩn emoji picker
  const dispatch = useDispatch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };
  const handlePickerOutsideClick = () => {
    setShowEmojiPicker(false);
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
    console.log(emojiString);
    setContentPost(contentPost + emojiString);
  };

  const handlePostSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("content", contentPost);
    selectedFiles.forEach((file) => {
      formData.append(`media_file`, file);
    });

    try {
      await createPost(auth?.access_token, formData, dispatch);
      setModalUploadPost(false);
      setRefreshPosts((prev) => !prev);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng bài viết:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlerCloseModal = () => {
    setModalUploadPost(false);
  };
  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50 rounded-lg">
      <div className="bg-white rounded-lg p-2 md:w-[500px] w-full h-screen  md:h-auto">
        <div className="modal_header border-b py-2 flex items-center justify-between">
          <h3 className="text-center mx-auto text-xl">Tạo bài viết mới</h3>
          <button
            className="p-2 bg-bg-gray rounded-full"
            onClick={handlerCloseModal}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <div
          className="modal_content my-3 flex flex-col"
          style={{ height: showUploadArea ? "auto" : "100%" }}
        >
          <div className="content_user flex items-center gap-2">
            <img
              src={user?.avatar_user}
              alt="avatar user"
              className="w-10 h-10 rounded-full"
            />
            <span className="nameUser">{user?.username}</span>
          </div>
          <div className="content-input-from-user md:h-[300px] overflow-auto mb-2 relative">
            <textarea
              className="w-full p-2 text-[20px] h-[100px] outline-none"
              placeholder={user.username + contentPost}
              value={contentPost}
              onChange={(e) => setContentPost(e.target.value)}
            ></textarea>
            <div className="my-auto relative">
              {showUploadArea && (
                <>
                  {selectedFiles.length > 0 ? (
                    <div
                      className={`rounded-xl border w-full relative ${
                        selectedFiles.length >= 3
                          ? "grid grid-cols-2 gap-2"
                          : ""
                      }`}
                    >
                      {selectedFiles.map((file, index) => (
                        <div
                          key={file.name}
                          className={`selected-image relative ${
                            index === 0 ? "col-span-2" : ""
                          }`}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            className="object-cover w-full h-auto"
                            alt="image_user_post"
                            style={{ maxHeight: "200px" }}
                          />
                          {index === 0 && (
                            <div className="action-image absolute z-10 top-2 left-2 bg-white p-2 rounded-md hover:opacity-95">
                              <button
                                className="flex items-center"
                                onClick={handleAddMediaButtonClick}
                              >
                                <span>Thêm ảnh/video</span>
                                <IoMdCreate size={24} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <label htmlFor="file" className="labelFile mb-2">
                      <UploadIcon />
                      <p>Upload video/image</p>
                    </label>
                  )}
                </>
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
          </div>

          <div className="border p-4 rounded-lg flex md:items-center gap-5 relative">
            <span>Thêm vào bài viết của bạn</span>
            <button onClick={handleUploadButtonClick}>
              <CiImageOn size={24} color="#45bd62" />
            </button>
            {showEmojiPicker && (
              <div className="absolute md:top-[-450px] right-0 mt-2 mr-2">
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  emojiSize={20}
                  emojiButtonSize={28}
                />
              </div>
            )}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </button>
          </div>
          <div className="action-post">
            <button
              className={`w-full mt-2 bg-bg-blue text-white p-2 rounded-md text-16 ${
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
