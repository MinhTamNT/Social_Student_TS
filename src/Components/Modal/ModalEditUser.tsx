import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { GrFormPreviousLink } from "react-icons/gr";
import { EditSection } from "../Edit/EditPicture";
import { ModalUploadPicture } from "./ModalUploadPicture";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../Hook/useIsMobile";
import { updateUser } from "../../Redux/apiRequest";
import { RootState } from "../../Redux/store";
import { updateError, updateSuccess } from "../../Redux/userSlice";
import toast from "react-hot-toast";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_user: string;
  cover_photo: string | null; // Ensure cover_photo can be null
}

interface Props {
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
}

const ModalEditUser: React.FC<Props> = ({ setModalEdit, profile }) => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<number>(0);
  const [isEditPicture, setIsEditPicture] = useState<boolean>(false);
  const [editType, setEditType] = useState<"avatar_user" | "cover_photo">(
    "avatar_user"
  );
  const [formData, setFormData] = useState<Profile>({
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username,
    email: profile.email,
    avatar_user: profile.avatar_user,
    cover_photo: profile.cover_photo,
  });
  const dispatch = useDispatch();
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      await updateUser(formData, dispatch, auth?.access_token);
      setModalEdit(false);
      dispatch(updateSuccess(formData));
      toast.success("Update success");
    } catch (error) {
      console.error("Error updating user:", error);
      dispatch(updateError());
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModalUpload = (type: "avatar_user" | "cover_photo") => {
    setIsEditPicture(true);
    setEditType(type);
  };

  const handleUploadComplete = (imageUrl: string) => {
    if (editType === "avatar_user") {
      setFormData({ ...formData, avatar_user: imageUrl });
    } else if (editType === "cover_photo") {
      setFormData({ ...formData, cover_photo: imageUrl });
    }
    setIsEditPicture(false);
  };

  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white w-full md:w-[720px] md:h-[680px] h-screen relative">
        <div className="header-modal-edit shadow-md p-2">
          <button
            className="flex items-center gap-2"
            onClick={() => setModalEdit(false)}
          >
            <GrFormPreviousLink size={24} />
            <span className="text-16">Edit Profile</span>
          </button>
        </div>
        <div className="modal-content px-2">
          <div className="edit-picture">
            <EditSection
              title="Avatar User"
              src={profile.avatar_user}
              onClick={() => handleOpenModalUpload("avatar_user")}
            />
            <div className="w-full flex justify-center mt-2 relative border-b-2 p-2">
              {profile.cover_photo === null ? (
                <div className="md:w-[500px] w-[320px] h-[183px] rounded-md bg-slate-500 hover:opacity-95 cursor-pointer">
                  <button
                    className="flex items-center justify-center mx-auto my-20"
                    onClick={() => handleOpenModalUpload("cover_photo")}
                  >
                    <MdOutlineFileUpload size={25} color="white" />
                    <span className="text-center text-20 text-white">
                      Update cover Photo
                    </span>
                  </button>
                </div>
              ) : (
                <EditSection
                  title="Cover photo"
                  src={profile.cover_photo}
                  onClick={() => handleOpenModalUpload("cover_photo")}
                />
              )}
            </div>
          </div>

          <div className="Information px- mt-1">
            <div className="user_information">
              {isMobile ? (
                <>
                  {step === 0 && (
                    <>
                      <div className="flex flex-col mb-5">
                        <label htmlFor="first name" className="mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="p-2 border b"
                          value={formData.first_name}
                          onChange={handleChange}
                          name="first_name"
                        />
                      </div>
                      <div className="flex flex-col mb-5">
                        <label htmlFor="last name" className="mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="p-2 border b"
                          value={formData.last_name}
                          onChange={handleChange}
                          name="last_name"
                        />
                      </div>
                      <Button variant="contained" onClick={handleContinue}>
                        <Typography variant="body2">Next</Typography>
                      </Button>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="flex flex-col mb-5">
                        <label htmlFor="username" className="mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          className="p-2 border b"
                          value={formData.username}
                          onChange={handleChange}
                          name="username"
                        />
                      </div>
                      <div className="flex flex-col mb-5">
                        <label htmlFor="email" className="mb-2">
                          Email
                        </label>
                        <input
                          type="text"
                          className="p-2 border b"
                          value={formData.email}
                          onChange={handleChange}
                          name="email"
                        />
                      </div>
                      <Button variant="contained" onClick={handleSubmit}>
                        <Typography variant="body2">Update</Typography>
                      </Button>
                      <Button variant="text" onClick={handleBack}>
                        <Typography variant="body2">Back</Typography>
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-5">
                    <label htmlFor="first name" className="mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="p-2 border b rounded-lg"
                      value={formData.first_name}
                      onChange={handleChange}
                      name="first_name"
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <label htmlFor="last name" className="mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="p-2 border b rounded-lg"
                      value={formData.last_name}
                      onChange={handleChange}
                      name="last_name"
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <label htmlFor="username" className="mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      className="p-2 border b rounded-lg"
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      className="p-2 border b rounded-lg"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:flex justify-center hidden ">
            <Button variant="contained" onClick={handleSubmit}>
              <Typography variant="body2">Save</Typography>
            </Button>
          </div>
        </div>
        {isEditPicture && (
          <ModalUploadPicture
            handleUploadComplete={handleUploadComplete}
            closeModal={() => setIsEditPicture(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ModalEditUser;
