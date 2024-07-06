import { ReactElement, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "../Sidebar/Sidebar";
type Props = {
  children: ReactElement;
};
export const HeaderOnly = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlerMentClick = () => {
    setIsSidebarOpen(true);
  };
  return (
    <div>
      <Header onMenuClick={handlerMentClick} />
      <div className="conatiner pt-[60px] max-w-[100%]">
        <div className="conatiner  max-w-[100%]">
          <div
            className={` w-[300px] md:mr-20 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
          <div className="content  mx-auto md:w-[1120px]">{children}</div>
        </div>
      </div>
    </div>
  );
};
