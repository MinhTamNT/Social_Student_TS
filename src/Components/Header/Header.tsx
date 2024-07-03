import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { logoutSuccess } from "../../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { HiOutlineMenuAlt1, HiOutlineBell } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Logout, Settings } from "@mui/icons-material";
import { Search } from "../Search/Search";

interface IProp {
  onMenuClick: () => void;
}

export const Header: React.FC<IProp> = ({ onMenuClick }) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLink = () => {
    navigate(`/profile/${user?.username}`);
  };
  const handlerLogoutUser = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <header className="bg-slate-100 shadow-md h-16 top-0 left-0 px-2 py-2 fixed w-full z-10 flex items-center justify-between">
      <div className="header-left">
        <img
          src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Mo-TPHCM-OU-V.png"
          alt="logo-website"
          className="h-10 md:flex hidden object-cover"
        />
        <button
          className="w-10 h-10 p-2 cursor-pointer hover:opacity-85 md:hidden"
          onClick={onMenuClick}
        >
          <HiOutlineMenuAlt1 size={30} className="cursor-pointer" />
        </button>
      </div>
      <Search />
      <div className="header-action-right flex items-center gap-2">
        {user && (
          <>
            <div className="header-search md:hidden">
              <IconButton>
                <CiSearch size={30} className="cursor-pointer" />
              </IconButton>
            </div>
            <div className="header-bell">
              <IconButton>
                <HiOutlineBell size={30} className="cursor-pointer" />
              </IconButton>
            </div>
            <div className="header-user-action ml-2 flex items-center">
              <IconButton onClick={handleClick}>
                <Avatar src={user.avatar_user} alt="avatar-user" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  padding: 2,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLink}>
                  <Avatar src={user.avatar_user} alt="avatar-user" />
                  My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Settings fontSize="small" />
                  Setting
                </MenuItem>
                <MenuItem onClick={handlerLogoutUser}>
                  <Logout fontSize="small" />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
