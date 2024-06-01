import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { GrFormPreviousLink } from "react-icons/gr";
import { EditSection } from "../Edit/EditPicture";
import { InputField } from "../InputFields/InputField";
import { ModalUploadPicture } from "./ModalUploadPicture";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useIsMobile } from "../../Hook/useIsMobile";
interface Profile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_user: string;
  cover_photo: string;
}

interface Props {
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
}

const ModalEditUser: React.FC<Props> = ({ setModalEdit, profile }) => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<number>(0);
  const [isEditPicture, setIsEditPicture] = useState<boolean>(false);
  const [formData, setFormData] = useState<Profile>({
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username,
    email: profile.email,
    avatar_user: profile?.avatar_user,
    cover_photo: profile?.cover_photo,
  });
  const dispatch = useDispatch();
  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    setModalEdit(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
              onClick={() => setIsEditPicture(!isEditPicture)}
            />
            <div className="w-full flex justify-center mt-2 relative border-b-2 p-2">
              {profile.cover_photo === null ? (
                <>
                  <div className="md:w-[500px] w-[320px] h-[183px] rounded-md bg-slate-500 hover:opacity-95 cursor-pointer">
                    <button className="flex items-center justify-center mx-auto my-20">
                      <MdOutlineFileUpload size={25} color="white" />
                      <span className="text-center text-20 text-white">
                        Update cover Photo
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <EditSection
                    title="Cover photo"
                    src={profile.cover_photo}
                    onClick={() => setIsEditPicture(!isEditPicture)}
                  />
                </>
              )}
            </div>
          </div>

          <div className="Information px- mt-1">
            <div className="user_information">
              {isMobile ? (
                <>
                  {step === 0 && (
                    <>
                      <InputField
                        data={formData?.first_name}
                        setData={handleChange}
                        inputType="text"
                        label="Frist name"
                        classNameLabel="mb-2"
                        classNameInput="p-2 border b"
                        value={formData.first_name}
                      />
                      <InputField
                        data={formData?.last_name}
                        setData={handleChange}
                        inputType="text"
                        label="Email"
                        classNameLabel="mb-2"
                        classNameInput="p-2 border b"
                        value={formData.last_name}
                      />
                      <Button variant="contained" onClick={handleContinue}>
                        <Typography variant="body2">Next</Typography>
                      </Button>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <InputField
                        data={formData?.username}
                        setData={handleChange}
                        inputType="text"
                        label="Username"
                        classNameLabel="mb-2"
                        classNameInput="p-2 border b"
                        value={formData.username}
                      />
                      <InputField
                        data={formData?.email}
                        setData={handleChange}
                        inputType="text"
                        label="Email"
                        classNameLabel="mb-2"
                        classNameInput="p-2 border b"
                        value={formData.email}
                      />

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
                <>
                  <div className="grid grid-cols-2">
                    <InputField
                      data={formData?.first_name}
                      setData={handleChange}
                      inputType="text"
                      label="Frist name"
                      classNameLabel="mb-2"
                      classNameInput="p-2 border b w-[300px] rounded-lg"
                      value={formData.first_name}
                    />
                    <InputField
                      data={formData?.last_name}
                      setData={handleChange}
                      inputType="text"
                      label="Last Name"
                      classNameLabel="mb-2"
                      classNameInput="p-2 border b w-[300px] rounded-lg"
                      value={formData.last_name}
                    />
                    <InputField
                      data={formData?.username}
                      setData={handleChange}
                      inputType="text"
                      label="Username"
                      classNameLabel="mb-2"
                      classNameInput="p-2 border b w-[300px] rounded-lg"
                      value={formData.username}
                    />
                    <InputField
                      data={formData?.email}
                      setData={handleChange}
                      inputType="text"
                      label="Email"
                      classNameLabel="mb-2"
                      classNameInput="p-2 border b w-[300px] rounded-lg"
                      value={formData.email}
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                    onClick={handleSubmit}
                  >
                    <Typography variant="body2">Update</Typography>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        {isEditPicture && <ModalUploadPicture />}
      </div>
    </div>
  );
};

export default ModalEditUser;
