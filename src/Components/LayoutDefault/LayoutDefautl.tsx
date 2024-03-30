import { ReactElement, useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

type Props = {
  children: ReactElement;
};

export const LayoutDefautl = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlerMentClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="wrapper overflow-auto md:overflow-hidden font-sora">
      <Header onMenuClick={handlerMentClick} />
      <div className="conatiner flex pt-[60px] max-w-[100%]">
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="content md:w-[1120px] flex-1">{children}</div>
      </div>
    </div>
  );
};
