import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export const PostStory = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
        <div className="w-[100px] h-full border border-neutral-600 rounded-lg">
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
        {user?.stories.length > 0 ? (
          user?.stories.map((story: any) => (
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
              <img src={} alt="image_user" />
            </button>
          ))
        ) : (
          <p className="text-white">Không có câu chuyện.</p>
        )}
      </div>
      {showModal && selectedMedia && (
        <div className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-full h-screen">
            {typeof selectedMedia === "string" &&
            selectedMedia.endsWith(".mp4") ? (
              <video
                src={selectedMedia}
                className="w-full h-full object-cover"
                autoPlay
              >
                <track
                  kind="captions"
                  src={selectedMedia}
                  srcLang="en"
                  label="English"
                />
              </video>
            ) : (
              <img
                src={selectedMedia}
                alt="selectedMedia"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
