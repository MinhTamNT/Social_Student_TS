import { Button } from "@mui/material";
interface IProp {
  title: string;
  src: string;
  onClick: () => void;
}

export const EditSection = ({ title, src, onClick }: IProp) => (
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
        className="h-[128px] w-[128px] rounded-full object-cover"
      />
    </div>
  </div>
);
