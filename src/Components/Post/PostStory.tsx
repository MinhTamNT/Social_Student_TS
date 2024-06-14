import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import MediaViewer from "../Modal/ModalStory";
import ModalCreateStory from "../Modal/UploadStory/ModalUploadStory";

export const PostStory = () => {
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [stories, setStories] = useState<any[]>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [isCreateStory, setIsCreateStory] = useState(false);

  const fetchStories = useCallback(async () => {
    try {
      const res = await AuthAPI(auth?.access_token).get(endpoints["get_story"]);
      setStories(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [auth]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const openModal = (index: number) => {
    setSelectedMediaIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMediaIndex(null);
    setShowModal(false);
  };

  const isStoryVisible = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const timeDifference = now.getTime() - createdDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };

  return (
    <div className="flex w-[420px] md:w-[680px] bg-white shadow-sm overflow-x-auto p-2 rounded-md items-center ">
      <div className="ml-3 flex items-center gap-5">
        <div
          className="h-[183px] w-[113px] border rounded-md"
          onClick={() => setIsCreateStory(true)}
        >
          <img
            src={user?.avatar_user}
            className="w-full h-[130px] object-cover rounded-md"
            alt="avatar_user"
          />
          <button className="text-center px-3">
            <span>Create Story</span>
          </button>
        </div>
        {stories.length > 0 ? (
          stories
            .filter((story) => isStoryVisible(story.created_at))
            .map((story, index) => (
              <div
                key={story.id}
                className="w-[103px] h-[183px] relative"
                onClick={() => openModal(index)}
              >
                {story.media_file && (
                  <>
                    {typeof story.media_file === "string" &&
                    story.media_file.endsWith(".mp4") ? (
                      <video
                        src={story.media_file}
                        className="w-full h-full object-cover rounded-lg"
                      >
                        <track
                          kind="captions"
                          src="path_to_captions_file.vtt"
                          srcLang="en"
                          label="English"
                        />
                      </video>
                    ) : (
                      <img
                        src={story.media_file}
                        alt="story"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </>
                )}
                <img
                  src={story?.user?.avatar_user}
                  alt="avatar_user"
                  className="absolute top-2 w-5 left-2 border rounded-full border-blue-400"
                />
                <span className="absolute bottom-0 text-13 text-white font-bold left-5">
                  {story?.user?.username}
                </span>
              </div>
            ))
        ) : (
          <p className="text-gray-500">Không có câu chuyện.</p>
        )}
      </div>

      {showModal && selectedMediaIndex !== null && (
        <MediaViewer
          mediaList={stories
            .filter((story) => isStoryVisible(story.created_at))
            .map((story) => story.media_file)}
          initialIndex={selectedMediaIndex}
          onClose={closeModal}
        />
      )}
      {isCreateStory && (
        <ModalCreateStory setIsCreateStory={setIsCreateStory} />
      )}
    </div>
  );
};
