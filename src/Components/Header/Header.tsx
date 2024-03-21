import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
interface IProp {
  onMenuClick: () => void;
}
export const Header: React.FC<IProp> = ({ onMenuClick }) => {
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
          <HiOutlineMenuAlt1 size={24} className="cursor-pointer" />
        </button>
      </div>
      <div className="header-action-right flex items-center gap-2">
        <div className="header-search">
          <button className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85">
            <CiSearch size={24} className="cursor-pointer" />
          </button>
        </div>
        <div className="header-bell">
          <button className="w-[32px] h-[32px] p-2 cursor-pointer hover:opacity-85">
            <HiOutlineBell size={24} className="cursor-pointer" />
          </button>
        </div>
        <div className="header-user-action">
          <img
            src="https://cdn-icons-png.freepik.com/512/219/219968.png"
            loading="lazy"
            className="w-10 h-10 object-cover cursor-pointer hover:opacity-95"
          />
        </div>
      </div>
    </header>
  );
};
