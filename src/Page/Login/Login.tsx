import React, { useState } from "react";
import { InputField } from "../../Components/InputFields/InputField";
import { Button } from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <form className="w-full md:w-[450px] md:h-[350px] md:shadow-md md:flex md:justify-center md:items-center md:flex-col  h-full ">
          <h1 className="font-bold text-[30px] text-center uppercase">
            Welcom back
          </h1>
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
            label="Password"
            data="Enter your username"
            type={"password"}
            value={password}
            classNameInput="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            setData={(e) => setPassword(e.target.value)}
          />
          <Button
            text="Sign in"
            className="w-full md:w-[300px] text-white bg-black p-3 rounded-md"
          />
          <div>
            <p className="flex justify-center items-center gap-2 text-14 mt-2 text-center">
              Do Have account ?
              <Button
                text="Sign up"
                className=" text-blue-400"
                onClick={() => navigate("/register")}
              />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
