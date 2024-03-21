import React, { useEffect, useState } from "react";

interface IProp {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: IProp) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Set 768 as the threshold for mobile devices, you can change it as needed
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
        isMobile ? "w-[40%] z-10 h-screen bg-white" : "" // Apply mobile styles if isMobile is true
      } ${
        isOpen
          ? "block animate-slide-in-sidebar"
          : "hidden md:block md:animate-none animate-slide-out-sidebar" // Animation classes
      }`}
    >
      Sidebar
    </div>
  );
};
