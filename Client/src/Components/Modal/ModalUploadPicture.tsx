// ModalUploadPicture.tsx
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";

interface Props {
  handleUploadComplete: (imageUrl: string, type: string) => void;
  closeModal: () => void;
}

export const ModalUploadPicture: React.FC<Props> = ({
  handleUploadComplete,
  closeModal,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setType("avatar_user");
    const uploadResponse = await uploadToServer(file);

    setImageUrl(uploadResponse.imageUrl);
  };

  const handleConfirm = () => {
    handleUploadComplete(imageUrl, type);
  };

  const uploadToServer = async (file: File) => {
    return { imageUrl: file.name };
  };

  return (
    <div className="fixed inset-0 flex items-end justify-center z-20 bg-black bg-opacity-50">
      <div className="bg-white w-full h-[100px] rounded-md">
        <div className="flex justify-center items-center mt-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            id="upload-photo"
          />
          <label htmlFor="upload-photo">
            <Button
              variant="outlined"
              style={{ marginTop: "10px", marginLeft: "10px" }}
              component="span"
            >
              <MdOutlineFileUpload size={32} />
              <Typography variant="h6">Upload from library</Typography>
            </Button>
          </label>
          {imageUrl && (
            <>
              <Button
                variant="contained"
                style={{ marginTop: "10px", marginLeft: "10px" }}
                onClick={handleConfirm}
              >
                <Typography variant="h6">Confirm</Typography>
              </Button>
              <Button
                variant="text"
                style={{ marginTop: "10px", marginLeft: "10px" }}
                onClick={closeModal}
              >
                <Typography variant="h6">Cancel</Typography>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
