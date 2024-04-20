import { ReactElement, useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactElement;
};

export const LayoutDefautl = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlerMentClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="wrapper overflow-x-hidden font-roboto">
      <Toaster position="top-right" reverseOrder={true} />
      <Header onMenuClick={handlerMentClick} />
      <div className="conatiner flex justify-between pt-[60px] max-w-[100%]">
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="content md:w-[1120px] mx-auto">{children}</div>
      </div>
    </div>
  );
};
