import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
interface IProp {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsSidebarOpen }: IProp) => {
  const [isMobile, setIsMobile] = useState(false);
  const handlerCloseMenu = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    const handleResize = () => {
      checkIsMobile();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`md:static absolute top-0 ${
        isMobile
          ? "w-[40%] z-10 h-screen bg-white"
          : "w-[272px] border-r-2 rounded-lg px-5 py-3"
      } ${
        isOpen
          ? "block animate-slide-in-sidebar"
          : "hidden md:block md:animate-none animate-slide-out-sidebar"
      }`}
    >
      <div className="header_close_sidebar md:hidden block ">
        <button
          className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85 md:hidden absolute right-0"
          onClick={handlerCloseMenu}
        >
          <IoIosClose size={24} className="cursor-pointer" />
        </button>
      </div>
      <div>asdasda</div>
    </div>
  );
};
