import { Tab, Tabs } from "@mui/material";
import * as React from "react";
import { TabPanel } from "../TabView/TabViewStory";
import "./modalStyle.css";
import { UploadStory } from "./UploadStory/UploadStory";
interface ModalCreateStoryProps {
  setIsCreateStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateStory: React.FC<ModalCreateStoryProps> = ({
  setIsCreateStory,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div
      className="fixed inset-0 flex z-20 justify-center items-center bg-black bg-opacity-50"
      onClick={() => setIsCreateStory(false)}
    >
      <div
        className="bg-white w-full md:w-[40%] md:h-[500px] h-screen md:rounded-xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Tabs"
          variant="fullWidth"
        >
          <Tab label="Image" />
          <Tab label="Video" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <UploadStory />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <UploadStory />
        </TabPanel>
        <button onClick={() => setIsCreateStory(false)}>Close Modal</button>
      </div>
    </div>
  );
};

export default ModalCreateStory;
