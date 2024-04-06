import React from "react";
import { IoClose } from "react-icons/io5";
interface MediaViewerProps {
  selectedMedia: string | null;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  selectedMedia,
  onClose,
}) => {
  if (!selectedMedia) return null;

  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-full md:w-[80%] md:h-[1020px] h-screen relative ">
        {typeof selectedMedia === "string" && selectedMedia.endsWith(".mp4") ? (
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
            className="w-full h-screen  object-cover"
          />
        )}
        <button
          className="absolute top-3 bg-white right-3 rounded-lg "
          onClick={onClose}
        >
          <IoClose size={32} />
        </button>
      </div>
    </div>
  );
};

export default MediaViewer;
