import React, { useEffect, useState } from "react";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

interface MediaViewerProps {
  mediaList: string[];
  initialIndex: number;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  mediaList,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentMedia = mediaList[currentIndex];
    const isVideo =
      typeof currentMedia === "string" && currentMedia.endsWith(".mp4");
    const duration = isVideo ? 50000 : 5000;
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + (100 / duration) * 100 : 100));
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (progress === 100) {
      if (currentIndex < mediaList.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setProgress(0);
      } else {
        onClose();
      }
    }
  }, [progress, currentIndex, mediaList, onClose]);

  const handleNext = () => {
    if (currentIndex < mediaList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  if (!mediaList.length) return null;

  const currentMedia = mediaList[currentIndex];
  const isVideo =
    typeof currentMedia === "string" && currentMedia.endsWith(".mp4");

  return (
    <div className="fixed inset-0 flex z-30 justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white md:h-[700px] md:w-[500px] h-full w-full p-5  rounded-lg shadow-lg overflow-hidden">
        {isVideo ? (
          <video
            src={currentMedia}
            className="w-full h-full object-cover"
            autoPlay
            onEnded={handleNext}
            controls
          >
            <track
              kind="captions"
              src={currentMedia}
              srcLang="en"
              label="English"
            />
          </video>
        ) : (
          <img
            src={currentMedia}
            alt="selectedMedia"
            className="w-full h-full object-cover"
          />
        )}
        <button
          className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
          onClick={onClose}
        >
          <IoClose size={32} />
        </button>
        {currentIndex > 0 && (
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
            onClick={handlePrev}
          >
            <IoArrowBack size={32} />
          </button>
        )}
        {currentIndex < mediaList.length - 1 && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
            onClick={handleNext}
          >
            <IoArrowForward size={32} />
          </button>
        )}
        <div className="absolute top-0 left-0 w-full bg-gray-300 h-2">
          <div
            className="bg-blue-500 h-2 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MediaViewer;
