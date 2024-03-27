import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Menu } from "../Menu/Menu";
interface IProp {
  onMenuClick: () => void;
}
export const Header: React.FC<IProp> = ({ onMenuClick }) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );

  return (
    <header className=" bg-slate-100 shadow-md h-[60px] top-0 left-0 px-2 py-2 fixed w-full z-10 flex items-center justify-between">
      <div className="header-left">
        <img
          src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Mo-TPHCM-OU-V.png"
          className="h-10 md:flex hidden"
        />
        <button
          className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85 md:hidden"
          onClick={onMenuClick}
        >
          <HiOutlineMenuAlt1 size={30} className="cursor-pointer" />
        </button>
      </div>
      <Search />
      <div className="header-action-right flex items-center gap-2">
        {user ? (
          <>
            <div className="header-search md:hidden">
              <button className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85">
                <CiSearch size={30} className="cursor-pointer" />
              </button>
            </div>
            <div className="header-bell">
              <button className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85">
                <HiOutlineBell size={30} className="cursor-pointer" />
              </button>
            </div>
            <div className="header-user-action flex items-center">
              <div className="flex items-center">
                <Tippy
                  render={(attrs) => (
                    <div {...attrs} tabIndex={-1}>
                      <Menu />
                    </div>
                  )}
                >
                  <img
                    src={user?.avatar_user}
                    loading="lazy"
                    className="w-10 h-10 object-cover cursor-pointer hover:opacity-95"
                  />
                </Tippy>
                <Tippy content="Đăng xuất" placement="bottom">
                  <button className="w-[90px] p-2  ml-2 md:px-1  rounded-md text-white bg-red-color hover:opacity-90">
                    Đăng Xuất
                  </button>
                </Tippy>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <Button
              text="Sign in"
              className="text-white bg-black p-2 rounded-xl text-[17px]"
            />
            <Button
              text="Sign up"
              className="p-2 text-red-color text-[17px] "
            />
          </div>
        )}
      </div>
    </header>
  );
};
