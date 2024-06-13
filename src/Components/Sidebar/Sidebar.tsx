import React, { useEffect, useState } from "react";
import { IoIosClose, IoIosTrendingUp, IoIosMenu } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
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
      title: "Popular",
      icon: <IoIosTrendingUp size={30} />,
      route: "/popular",
    },
    {
      id: 4,
      title: "Create Post",
      icon: <CiSquarePlus size={30} />,
      route: "/create-post",
    },
    {
      id: 5,
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
        className={`md:fixed z-30 absolute md:top-10 top-0 ${
          isMobile
            ? "w-[70%] h-screen z-10 bg-white"
            : "w-[272px] rounded-lg px-5 py-3"
        } ${
          isOpen
            ? "block animate-slide-in-sidebar"
            : "hidden md:block md:animate-none animate-slide-out-sidebar"
        }`}
      >
        <div className="header_close_sidebar md:hidden block">
          <button
            className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85 md:hidden absolute right-0"
            onClick={handlerCloseMenu}
          >
            <IoIosClose size={30} className="cursor-pointer" />
          </button>
        </div>
        <div className="py-2 w-full md:mt-0 mt-10">
          <div className="">
            <div className="md:h-[600px]">
              {MenuSidebar.map((menu, index) => (
                <Link
                  to={menu.route}
                  className="flex cursor-pointer items-center mb-4 w-full hover:bg-bg-hover p-2 rounded-md"
                  key={index}
                >
                  {menu.icon}
                  <span className="ml-2 text-16 font-bold">{menu.title}</span>
                </Link>
              ))}
              <div className="md:flex items-center gap-2 hidden px-2">
                <IoIosMenu size={32} />
                <span className="text-[20px]">See more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
