import { ReactElement, useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactElement;
};

export const LayoutDefault: React.FC<Props> = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlerMentClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="wrapper overflow-x-hidden bg-[#f0f2f5] h-screen font-roboto ">
      <Toaster position="top-right" reverseOrder={true} />
      <Header onMenuClick={handlerMentClick} />
      <div className="conatiner flex justify-between pt-[60px] max-w-[100%]">
        <div className="w-[300px] md:mr-48">
          <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="content mx-auto md:w-[1120px]">{children}</div>
      </div>
    </div>
  );
};
