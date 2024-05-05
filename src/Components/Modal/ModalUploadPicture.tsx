import { Button, Typography } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";

export const ModalUploadPicture = () => {
  return (
    <div className="fixed inset-0 flex items-end justify-end z-20 bg-black bg-opacity-50">
      <div className="bg-white w-full h-[100px] rounded-md">
        <div className="flex justify-center items-center mt-4">
          <Button
            variant="outlined"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            <MdOutlineFileUpload size={32} />
            <Typography variant="h6">Upload from library</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
