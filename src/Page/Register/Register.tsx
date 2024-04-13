import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { CiCamera } from "react-icons/ci";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmPassword: string;
  imageUser: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [imageUser, setImageUser] = useState<string | null>(null); // Initialize with null

  const initialValues: FormValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
    imageUser: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignUp = (values: FormValues) => {
    console.log(values);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImageUser(URL.createObjectURL(selectedImage));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          <Form className="w-full md:w-[550px] md:h-[750px] md:shadow-md flex flex-col justify-center items-center  h-full">
            <h1 className="font-bold text-[30px] md:m-2 md:ml-5 md:text-left text-center uppercase">
              Sign Up
            </h1>
            <div className="md:flex justify-center gap-2 mt-2">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="image-upload"
                className="flex justify-center relative mb-2"
              >
                <img
                  src={
                    imageUser
                      ? imageUser
                      : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859"
                  }
                  alt="Upload"
                  className="cursor-pointer w-[150px] h-[150px] border-2 bg-transparent rounded-full object-cover"
                />
                <CiCamera
                  size={32}
                  className="bottom-0 right-2  cursor-pointer absolute"
                />
              </label>
            </div>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <Field
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
            <div className="md:flex md:justify-center">
              <Button
                text="Sign Up"
                className="w-[300px] md:w-[300px] text-white bg-black p-3 rounded-md md:mt-5 mt-3"
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};
