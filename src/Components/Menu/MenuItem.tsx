import React, { useState } from "react";

const menuItems = [
  { name: "See Profile", icon: "👀" },
  { name: "Dark Mode ", icon: "🌙" },
  { name: "Settings", icon: "⚙️" },
];

export const MenuItem = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      {menuItems.map((menuItem, index) => (
        <div
          key={index}
          onClick={
            menuItem.name === "Settings" ? handleSettingsClick : undefined
          }
          className="text-16 cursor-pointer mb-5 md:mb-2 px-1 p-2"
        >
          <span>{menuItem.icon}</span> {menuItem.name}
        </div>
      ))}
    </div>
  );
};
