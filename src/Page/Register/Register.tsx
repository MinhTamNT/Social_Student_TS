import React, { useState } from "react";
import { InputField } from "../../Components/InputFields/InputField";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cofirmPassowrd, setConfirmPassword] = useState("");
  const [imageUser, setImageUser] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {};
  const handleImageChange = (event: any) => {
    const selectedImage = event.target.files[0];
    setImageUser(selectedImage);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <form className="w-full md:w-[750px] md:h-[650px] md:shadow-md md:flex md:flex-col h-full">
          <h1 className="font-bold text-[30px] md:m-2 md:ml-5 md:text-left text-center uppercase">
            Sign Up
          </h1>
          <div className="md:flex justify-center  gap-2 mt-2">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload" className="flex justify-center">
              <img
                src={
                  imageUser
                    ? URL.createObjectURL(imageUser) // Sử dụng URL của hình ảnh
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGNz9eFqUxDLaVSroihJ-vey0GV_hHdWGpEU_PeNi0bOBH9ucSE8ANQj1U8NwI_SC1CiU&usqp=CAUtte-avatar-user-upload-pixel-art-user-profile-document-black.png"
                }
                alt="Upload"
                className="cursor-pointer w-[150px] h-[150px]  bg-transparent rounded-3xl object-cover"
              />
            </label>
          </div>
          <div className="md:flex justify-around ">
            <InputField
              inputType="normal"
              label="First Name"
              data="Enter your first name"
              value={firstName}
              setData={(e) => setFirstName(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] rounded-md mt-2"
            />
            <InputField
              inputType="normal"
              label="Last Name"
              data="Enter your last name"
              value={lastName}
              setData={(e) => setLastName(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] rounded-md mt-2"
            />
          </div>
          <div className="md:flex justify-around  gap-2">
            <InputField
              inputType="normal"
              label="Username"
              data="Enter your username"
              value={username}
              setData={(e) => setUserName(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
            <InputField
              inputType="normal"
              label="Email"
              data="Enter your email"
              value={email}
              setData={(e) => setEmail(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
          </div>
          <div className="md:flex justify-around  gap-2">
            <InputField
              inputType="normal"
              label="Password"
              data="Enter your password"
              type="password"
              value={password}
              setData={(e) => setPassword(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
            <InputField
              inputType="normal"
              label="Confirm Password"
              data="Enter your confirm password"
              type="password"
              value={cofirmPassowrd}
              setData={(e) => setConfirmPassword(e.target.value)}
              classNameInput="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
          </div>
          <div className="md:flex md:justify-center">
            <Button
              text="Sign Up"
              className="w-full md:w-[300px]  text-white bg-black p-3 rounded-md mt-2"
              onClick={handleSignUp}
            />
          </div>
          <div className="flex justify-center items-center gap-2 mt-2 text-center">
            <span>Already have an account?</span>
            <Button
              text="Sign in"
              className="text-blue-400"
              onClick={() => navigate("/login")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
