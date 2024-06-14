// src/components/Modal/UploadStory/UploadStory.tsx

import React, { useState } from "react";

interface UploadStoryProps {
  onUploadStory: (formData: FormData) => void;
}

const UploadStory: React.FC<UploadStoryProps> = ({ onUploadStory }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
      const previews: string[] = [];
      Array.from(event.target.files).forEach((file) => {
        previews.push(URL.createObjectURL(file));
      });
      setFilePreviews(previews);
    }
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("media_files", file);
      });
      onUploadStory(formData); // Trigger the upload from parent component
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Media Files:
      </label>
      <div className="mt-1 flex items-center">
        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
          <span>Choose files</span>
          <input
            type="file"
            className="sr-only"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <p className="pl-1">or drag and drop</p>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={handleUpload}
          disabled={!selectedFiles}
        >
          Upload
        </button>
      </div>
      {selectedFiles && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">Selected Files:</p>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {filePreviews.map((preview, index) => (
              <li key={index} className="flex items-center">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-30 object-cover rounded-md"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadStory;
