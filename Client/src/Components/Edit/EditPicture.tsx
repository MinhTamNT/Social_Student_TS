import { Button } from "@mui/material";
import React from "react";

interface IProp {
  title: string;
  src: string;
  onClick: () => void;
  width?: string;
  height?: string;
}

export const EditSection = ({
  title,
  src,
  onClick,
  width = "128px", // Mặc định cho chiều rộng
  height = "128px", // Mặc định cho chiều cao
}: IProp) => (
  <div className="border-b-2 p-2">
    <div className="flex items-center justify-between">
      <p className="font-medium">{title}</p>
      <Button variant="text" onClick={onClick}>
        Edit
      </Button>
    </div>
    <div className="flex justify-center items-center">
      <img
        src={src}
        alt={title}
        style={{ width, height }}
        className="rounded-full object-cover"
      />
    </div>
  </div>
);
