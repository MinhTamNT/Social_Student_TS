import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
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
  useEffect(() => {
    const fectStories = async () => {
      try {
        const res = await AuthAPI(auth?.access_token).get(
          endpoints["get_story"]
        );
        if (JSON.stringify(res.data) !== JSON.stringify(stories)) {
          setStories(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fectStories();
  }, [stories]);
  const openModal = (media: string) => {
    setSelectedMedia(media);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setShowModal(false);
  };

  return (
    <div className="w-full flex h-[150px] rounded-lg">
      <div className="md:w-full flex gap-3 overflow-auto">
        <div
          className="w-[100px] h-full border border-neutral-600 rounded-lg cursor-pointer"
          onClick={() => setIsCreateStory(!isCreateStory)}
        >
          <div className="user relative">
            <img
              src={user?.avatar_user}
              className="object-cover w-[150px] h-[120px] rounded-lg"
              alt="logoUser"
            />
            <button className="absolute bottom-[-9px] left-[40%] ">
              <CiSquarePlus className="" size={24} color="black" />
            </button>
            <span className="absolute bottom-[-26px] text-13 font-bold left-6  text-red-color">
              Create
            </span>
          </div>
        </div>
        {stories.length > 0 ? (
          stories.map((story: any) => (
            <button
              key={story.id}
              className="w-[100px] h-full relative"
              onClick={() => openModal(story.media_file)}
            >
              {story.media_file && (
                <>
                  {typeof story.media_file === "string" &&
                  story.media_file.endsWith(".mp4") ? (
                    <video
                      src={story.media_file}
                      className="w-[150px] h-full object-cover rounded-lg"
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
                      className="w-[150px] h-full object-cover rounded-lg"
                    />
                  )}
                </>
              )}
            </button>
          ))
        ) : (
          <p className="text-white">Không có câu chuyện.</p>
        )}
      </div>
      {showModal && selectedMedia && (
        <MediaViewer selectedMedia={selectedMedia} />
      )}
      {isCreateStory && <ModalCreateStory setIsCreateStory = {setIsCreateStory}  />}
    </div>
  );
};
