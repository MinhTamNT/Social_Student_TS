import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import MediaViewer from "../Modal/ModalStory";
import ModalCreateStory from "../Modal/ModalCreateStory";

export const PostStory = () => {
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [stories, setStories] = useState<[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
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

  const openModal = (media: string) => {
    setSelectedMedia(media);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setShowModal(false);
  };

  return (
    <div className="flex w-[420px] md:w-[680px] overflow-x-auto  p-2 rounded-md items-center space-x-4">
      <div className="h-[183px] w-[123px] border rounded-md">
        <img
          src={user?.avatar_user}
          className="w-full h-[120px]"
          alt="avatar_user"
        />
        <button className="text-center px-3">
          <span>Create Story</span>
        </button>
      </div>
      <div className=" ml-3 flex items-center gap-5">
      {stories.length > 0 ? (
        stories.map((story: any) => (
          <div
            key={story.id}
            className="w-[103px] h-[183px] relative "
            onClick={() => openModal(story.media_file)}
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
            <span className="absolute bottom-0  text-13 text-white font-bold left-5">
              {story?.user?.username}
            </span>
          </div>
        ))
      ) : (
        <p className="text-white">Không có câu chuyện.</p>
      )}
      </div>

      {showModal && selectedMedia && (
        <MediaViewer selectedMedia={selectedMedia} onClose={closeModal} />
      )}
      {isCreateStory && (
        <ModalCreateStory setIsCreateStory={setIsCreateStory} />
      )}
    </div>
  );
};
