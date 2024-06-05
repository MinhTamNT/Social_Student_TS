import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { CiCamera } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  [key: string]: string;
}

interface FieldConfig {
  name: string;
  placeholder: string;
  type: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [imageUser, setImageUser] = useState<string | null>(null);

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
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

  const formFields: FieldConfig[] = [
    {
      name: "firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
    },
    {
      name: "username",
      placeholder: "Username",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "text",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
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
          {formFields.map((field, index) => (
            <div key={index}>
              <Field
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500"
              />
            </div>
          ))}
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
  );
};
