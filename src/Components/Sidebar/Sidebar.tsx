import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineLocalPolice } from "react-icons/md";
import { Link } from "react-router-dom";

interface IProp {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsSidebarOpen }: IProp) => {
  const MenuSidebar = [
    {
      id: 1,
      title: "Home",
      icon: <GoHome size={30} />,
      route: "/",
    },
    {
      id: 2,
      title: "Message",
      icon: <FiMessageCircle size={30} />,
      route: "/messages",
    },
    {
      id: 3,
      title: "Private Policy",
      icon: <MdOutlineLocalPolice size={30} />,
      route: "/privacy-policy",
    },
  ];

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
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"
          onClick={handlerCloseMenu}
        ></div>
      )}
      <div
        className={`md:fixed z-30 absolute md:top-[65px] top-0 ${
          isMobile
            ? "w-[70%] h-screen z-10 bg-white"
            : "w-[272px] rounded-lg px-5 py-3 bg-white shadow-lg"
        } ${
          isOpen
            ? "block animate-slide-in-sidebar"
            : "hidden md:block md:animate-none animate-slide-out-sidebar"
        }`}
      >
        <div className="header_close_sidebar md:hidden block">
          <button
            className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85 md:hidden absolute right-0 top-0 mt-2 mr-2"
            onClick={handlerCloseMenu}
          >
            <IoIosClose size={30} className="cursor-pointer" />
          </button>
        </div>
        <div className="py-2 w-full md:mt-0 mt-10">
          <div className="md:h-[600px] overflow-y-auto">
            {MenuSidebar.map((menu, index) => (
              <Link
                key={index}
                to={menu.route}
                className="flex items-center mb-4 p-2 rounded-md hover:bg-gray-200"
              >
                {menu.icon}
                <span className="ml-2 text-lg font-semibold">{menu.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
