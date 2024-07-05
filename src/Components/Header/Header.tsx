import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiOutlineBell, HiOutlineMenuAlt1 } from "react-icons/hi";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../Redux/authSlice";
import { Logout, Settings } from "@mui/icons-material";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";

interface IHeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<IHeaderProps> = ({ onMenuClick }) => {
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dateNow = new Date().getTime();

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/friend_notification/?token=${auth?.access_token}`
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received from server:", data);
      if (data && data.type === "notification") {
        setNotifications((prevNotifications) => [
          {
            message: data.message,
            type: "notification",
          },
          ...prevNotifications,
        ]);
        setUnreadCount((prevCount) => prevCount + 1); // Increase unread count
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5"></div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data.message}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{dateNow}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [auth?.access_token]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
    setUnreadCount(0); // Reset unread count when opening notifications
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
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
      <div className="header-search md:hidden">
        <IconButton>
          <CiSearch size={30} className="cursor-pointer" />
        </IconButton>
      </div>
      <div className="header-action-right flex items-center gap-2">
        <div className="header-bell">
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <HiOutlineBell size={30} className="cursor-pointer" />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
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
            {notifications.map((notification, index) => (
              <MenuItem key={index} onClick={handleNotificationClose}>
                {notification.message}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="header-user-action ml-2 flex items-center">
          <IconButton onClick={handleClick}>
            <Avatar src={user?.avatar_user} alt="avatar-user" />
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
              <Avatar src={user?.avatar_user} alt="avatar-user" />
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
      </div>
    </header>
  );
};
