import { Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../Redux/store";
import { TabPanel } from "../../TabView/TabViewStory";

import { createStoryThunk } from "../../../Redux/storySlice";
import UploadStory from "./UploadStory";
import { Loading } from "../../LoadingPage/LoadingPage";
import { IoMdClose } from "react-icons/io";

interface ModalCreateStoryProps {
  setIsCreateStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateStory: React.FC<ModalCreateStoryProps> = ({
  setIsCreateStory,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const dispatch = useAppDispatch();
  const storyStatus = useSelector((state: RootState) => state.story.status);
  const storyError = useSelector((state: RootState) => state.story.error);
  const accessToken = useSelector(
    (state: RootState) => state.auth.login.currentUser.access_token
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUploadStory = async (formData: FormData) => {
    dispatch(createStoryThunk({ accessToken, formData }));
  };

  React.useEffect(() => {
    if (storyStatus === "succeeded") {
      setIsCreateStory(false);
    }
  }, [storyStatus, setIsCreateStory]);

  return (
    <div
      className="fixed inset-0 flex z-30 w-full justify-center items-center bg-black bg-opacity-50"
      onClick={() => setIsCreateStory(false)}
    >
      <div
        className="bg-white w-full md:w-[500px] md:h-[550px] h-screen md:rounded-xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-16 flex items-center justify-between">
          <p className="mx-auto text-xl">Upload Story</p>
          <button className="" onClick={() => setIsCreateStory(false)}>
            <IoMdClose size={24} />
          </button>
        </div>
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
          <UploadStory onUploadStory={handleUploadStory} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <UploadStory onUploadStory={handleUploadStory} />
        </TabPanel>
        {storyStatus === "loading" && <Loading />}
        {storyError && <p>Error: {storyError}</p>}
      </div>
    </div>
  );
};

export default ModalCreateStory;
