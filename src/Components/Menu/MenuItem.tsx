import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";

const menuItems = [
  { name: "See Profile", icon: "👀" },
  { name: "Dark Mode ", icon: "🌙" },
  { name: "Settings", icon: "⚙️" },
];

export const MenuItem = () => {
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector((state: RootState) => state.user?.user?.currentUser);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.username}`);
    }
  };

  return (
    <div>
      {menuItems.map((menuItem, index) => (
        <div
          key={index}
          onClick={
            menuItem.name === "Settings"
              ? handleSettingsClick
              : menuItem.name === "See Profile"
              ? handleProfileClick
              : undefined
          }
          className="text-16 cursor-pointer mb-5 md:mb-2 px-1 p-2"
        >
          <span>{menuItem.icon}</span> {menuItem.name}
        </div>
      ))}
    </div>
  );
};
