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
    <div className="wrapper">
      <Header onMenuClick={handlerMentClick} />
      <div className="conatiner pt-[60px]">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
